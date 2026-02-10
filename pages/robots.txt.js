function getCanonicalSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://longhollow.com';
  return raw.replace(/\/+$/, '');
}

export async function getServerSideProps({ req, res }) {
  // Serve a real robots.txt. Without this, requests fall through to `pages/[slug].js`
  // and return HTML, which crawlers may misinterpret.
  void req;
  const baseUrl = getCanonicalSiteUrl();
  const body = [
    'User-agent: *',
    // Let crawlers fetch `/search` so they can observe `X-Robots-Tag: noindex, nofollow`.
    // Block query variants to reduce crawling of faceted/paginated views.
    'Allow: /search',
    'Disallow: /search?*',
    'Disallow: /_next/',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(body);
  res.end();

  return { props: {} };
}

export default function RobotsTxt() {
  return null;
}
