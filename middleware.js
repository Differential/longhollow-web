import { NextResponse } from 'next/server';

const BLOCKED_SEARCH_UA =
  /bot|crawler|spider|facebookexternalhit|ahrefs|baiduspider|uptimerobot|better uptime|vercel-favicon|chrome privacy preserving prefetch proxy/i;
const SUSPICIOUS_SEARCH_UA =
  /Windows NT 10\.0.*Chrome\/(?:139|142)\.0\.0\.0/i;

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname !== '/search') {
    return NextResponse.next();
  }

  const query = searchParams.get('q');
  const hasQuery = Boolean(query && query.trim().length);
  if (hasQuery) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';

  if (BLOCKED_SEARCH_UA.test(userAgent)) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  if (!referer && SUSPICIOUS_SEARCH_UA.test(userAgent)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Cache-Control': 'no-store',
        'Retry-After': '120',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/search'],
};
