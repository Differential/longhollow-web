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
    // `/search` is server-rendered and expensive; it was the main endpoint hit during the usage anomaly.
    // Blocking here reduces crawl traffic for well-behaved crawlers.
    'Disallow: /search',
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
