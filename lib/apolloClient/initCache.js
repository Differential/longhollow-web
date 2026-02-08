// Import from the same entrypoint as the rest of the Apollo setup to avoid
// bundling multiple module variants in Next/Vercel runtime.
import { InMemoryCache } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';

import fragmentTypes from './fragmentTypes.json';
import introspectionToPossibleTypes from './introspectionToPossibleTypes';

const initCache = initialState => {
  const cache = new InMemoryCache({
    possibleTypes: introspectionToPossibleTypes(fragmentTypes),
  }).restore(initialState || {});

  // Apollo Client 3.14.x can pass `canonizeResults` into `cache.diff()`, but the
  // cache diff options no longer accept it, which can crash SSR.
  // Strip it defensively to keep SSR routes functional.
  const originalDiff = cache.diff.bind(cache);
  cache.diff = options => {
    if (
      options &&
      Object.prototype.hasOwnProperty.call(options, 'canonizeResults')
    ) {
      // Avoid mutating the caller's options object.
      const { canonizeResults: _ignored, ...rest } = options;
      return originalDiff(rest);
    }
    return originalDiff(options);
  };

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.DEBUG_APOLLO_CACHE_DIFF === '1'
  ) {
    const debugOriginalDiff = cache.diff.bind(cache);
    cache.diff = options => {
      // Helps debug Apollo internal cache diff option mismatches.
      // Intentionally verbose but gated behind an env var.
      console.log(
        '[debug] cache.diff options keys:',
        Object.keys(options || {})
      );
      console.log(new Error('[debug] cache.diff stack').stack);
      return debugOriginalDiff(options);
    };
  }

  if (typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: window.localStorage,
    });
  }

  return cache;
};

export default initCache;
