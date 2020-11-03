import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import theme from '../config/theme';
import { GlobalStyles } from '../styled';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;