import Head from 'next/head';
import { Analytics } from '@vercel/analytics/next';

import configureNProgress from 'config/nprogress';
import { AppProvider } from 'providers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NotFound from './404';

// Tracks the route changes and adds a bar to the top.
configureNProgress();

function App({ Component, pageProps = {} }) {
  const router = useRouter();
  const [dropdownData, setDropdownData] = useState(
    pageProps.dropdownData || null
  );

  useEffect(() => {
    function handleRouteChangeComplete() {
      window?.scrollTo?.(0, 0);
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    let cancelled = false;

    if (dropdownData) return undefined;

    async function loadDropdownData() {
      try {
        const response = await fetch('/api/dropdown-data');
        if (!response.ok) return;

        const data = await response.json();
        if (!cancelled) setDropdownData(data);
      } catch {
        // Use fallback empty dropdown data if the request fails.
      }
    }

    loadDropdownData();

    return () => {
      cancelled = true;
    };
  }, [dropdownData]);

  const { initialApolloState, ...componentProps } = pageProps;

  return (
    <>
      <Head>
        {/* uncomment this once app is live 
        <meta
          name="apple-itunes-app"
          content="app-id=com.longhollow.churchapp"
        />*/}
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AppProvider initialApolloState={initialApolloState}>
        {pageProps.error ? (
          <NotFound dropdownData={dropdownData} {...componentProps} />
        ) : (
          <Component dropdownData={dropdownData} {...componentProps} />
        )}
      </AppProvider>
      <Analytics />
    </>
  );
}

export default App;
