function getBaseUrl(req) {
  // Prefer forwarded headers on Vercel.
  const proto = req?.headers?.['x-forwarded-proto'] || 'https';
  const host =
    req?.headers?.['x-forwarded-host'] || req?.headers?.host || 'longhollow.com';

  return `${proto}://${host}`;
}

function buildSitemapXml({ baseUrl, urls }) {
  const now = new Date().toISOString();

  const entries = urls
    .map((path) => {
      const loc = `${baseUrl}${path}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
    '',
  ].join('\n');
}

export async function getServerSideProps({ req, res }) {
  // Serve a real sitemap.xml. Without this, requests fall through to `pages/[slug].js`
  // and return HTML (200), which breaks crawler behavior.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || getBaseUrl(req);

  // Keep this conservative: core landing pages only. The rest of the site is CMS-driven
  // and would require an explicit "list all slugs" query to be complete.
  const urls = [
    '/',
    '/about',
    '/connect',
    '/next-steps',
    '/watch',
    '/privacy-policy',
    '/terms-of-use',
  ];

  const xml = buildSitemapXml({ baseUrl, urls });

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function SitemapXml() {
  return null;
}

