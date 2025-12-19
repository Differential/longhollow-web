require('@testing-library/jest-dom');

afterAll(() => {
  if (typeof global.__restoreConsoleError === 'function') {
    global.__restoreConsoleError();
  }
});

process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: [],
    path: '/_next/image',
    loader: 'default',
  },
};

process.env.NEXT_PUBLIC_GA_CODE = process.env.NEXT_PUBLIC_GA_CODE || 'test-ga';

if (typeof window !== 'undefined') {
  window.gtag = window.gtag || jest.fn();
}
