import fetch from 'cross-fetch';
import { HttpLink } from '@apollo/client';

const SERVER_TIMEOUT_MS = 8000;
const CLIENT_TIMEOUT_MS = 15000;

function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timeoutMs =
    typeof window === 'undefined' ? SERVER_TIMEOUT_MS : CLIENT_TIMEOUT_MS;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timeoutId)
  );
}

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_APOLLOS_API || 'https://longhollow-cdn.global.ssl.fastly.net', // Server URL (must be absolute)
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  fetch: (url, options) => {
    // Strip excess whitespace to help mitigate query length issue
    const compressedUrl = url.replace(/(%20)+/g, '%20');
    return fetchWithTimeout(compressedUrl, options).then(async response => {
      if (process.env.NODE_ENV !== 'production' && !response.ok) {
        let bodyText = null;
        try {
          bodyText = await response.clone().text();
        } catch (error) {
          bodyText = null;
        }
        console.error('[ApolloNetworkError]', {
          url: compressedUrl,
          status: response.status,
          statusText: response.statusText,
          method: options?.method,
          headers: options?.headers,
          bodyText,
        });
      }
      return response;
    });
  },
  useGETForQueries: true,
});

export default httpLink;
