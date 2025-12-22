import { InMemoryCache } from '@apollo/client/core';
import { persistCache } from 'apollo3-cache-persist';

import introspectionToPossibleTypes from './introspectionToPossibleTypes';

function loadFragmentTypes() {
  try {
    // eslint-disable-next-line global-require
    return require('./fragmentTypes.json');
  } catch (error) {
    return null;
  }
}

const initCache = initialState => {
  const fragmentTypes = loadFragmentTypes();
  const cache = new InMemoryCache({
    possibleTypes: fragmentTypes
      ? introspectionToPossibleTypes(fragmentTypes)
      : undefined,
  }).restore(initialState || {});

  if (typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: window.localStorage,
    });
  }

  return cache;
};

export default initCache;
