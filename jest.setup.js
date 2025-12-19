const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Invalid hook call')) {
    return;
  }
  originalConsoleError(...args);
};

global.__restoreConsoleError = () => {
  console.error = originalConsoleError;
};

console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('canonizeResults')
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

global.__restoreConsoleWarn = () => {
  console.warn = originalConsoleWarn;
};
