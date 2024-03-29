import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter, Router } from 'next/router';
import nProgress from 'nprogress';
import '../external/index.css';
import '../external/nprogress.css';
import { Oswald, Nunito, Lato } from 'next/font/google';
import { useReportWebVitals } from 'next/web-vitals';
import * as gtag from '../lib/gtag';
import Page from '../components/Page';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: '100',
});

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    gtag.event({
      action: 'metadata',
      category: 'metadata',
      label: 'Site Version',
      value: gtag.GA_APP_VERSION,
    });
  });

  // workaround for static next.js not setting the lang attribute
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);
  useReportWebVitals((metric) => {
    gtag.webVitalEvent(metric);
  });

  const basicDarkModeStyles = darkMode
    ? 'bg-black text-white'
    : 'bg-white text-black';
  return (
    <main
      className={`${oswald.variable} ${nunito.variable} ${lato.variable} ${basicDarkModeStyles} font-sans min-h-screen`}
    >
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Page darkMode={darkMode} setDarkMode={setDarkMode}>
        <Component
          {...pageProps}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </Page>
    </main>
  );
};

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default App;
