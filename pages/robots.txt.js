export async function getServerSideProps({ res }) {
  // Serve a real robots.txt. Without this, requests fall through to `pages/[slug].js`
  // and return HTML, which crawlers may misinterpret.
  const body = [
    'User-agent: *',
    'Disallow: /search',
    'Disallow: /_next/',
    '',
    'Sitemap: https://longhollow.com/sitemap.xml',
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

