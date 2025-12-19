const originalConsoleError = console.error;

console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Invalid hook call')) {
    return;
  }
  originalConsoleError(...args);
};

global.__restoreConsoleError = () => {
  console.error = originalConsoleError;
};
