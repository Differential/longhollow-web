import { InMemoryCache } from '@apollo/client';
import fragmentTypes from './fragmentTypes.json';
import introspectionToPossibleTypes from './introspectionToPossibleTypes';

const CACHE_PERSIST_KEY = 'apollo-cache-persist';
const CACHE_PERSIST_DEBOUNCE_MS = 1000;

const initCache = initialState => {
  const cache = new InMemoryCache({
    possibleTypes: introspectionToPossibleTypes(fragmentTypes),
  }).restore(initialState || {});

  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(CACHE_PERSIST_KEY);
      if (raw) {
        cache.restore(JSON.parse(raw));
      }
    } catch (error) {
      console.warn('[ApolloCachePersist] Failed to restore cache', error);
    }

    let persistTimer;
    const persist = () => {
      clearTimeout(persistTimer);
      persistTimer = setTimeout(() => {
        try {
          const data = cache.extract();
          window.localStorage.setItem(CACHE_PERSIST_KEY, JSON.stringify(data));
        } catch (error) {
          console.warn('[ApolloCachePersist] Failed to persist cache', error);
        }
      }, CACHE_PERSIST_DEBOUNCE_MS);
    };

    ['write', 'evict', 'modify'].forEach(method => {
      const original = cache[method];
      if (typeof original !== 'function') return;
      cache[method] = (...args) => {
        const result = original.apply(cache, args);
        persist();
        return result;
      };
    });
  }

  return cache;
};

export default initCache;
