import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import CookieConsentBanner from 'components/cookie-banner';
import { ensureStartsWith } from 'lib/utils';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { theme } from 'theme';

// import PopUpManager from 'components/popup-manager';
import PopUpManager from 'components/popup-manager';
import Head from 'next/head';
import Script from 'next/script';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

const myFont = localFont({
  src: '../public/fonts/brandon-grotesque-regular.woff2',
  variable: '--font-brandon-regular'
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  verification: {
    google: `-qf55V-hqwPHoAin7YcWhW-UwJqI-p4M73tOUy7dWM8`,
    },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const Navbar = dynamic(() => import('components/layout/navbar'), { ssr: false });

  return (
    <ThemeProvider theme={theme}>
      <html lang="de">
        {/* Place the Head component here */}
        <Head>
          <meta name="google-site-verification" content="-qf55V-hqwPHoAin7YcWhW-UwJqI-p4M73tOUy7dWM8" />
        </Head>

        <body
          className={`bg-white text-black selection:bg-customColor selection:text-white ${myFont.variable}`}
        >
          <AppRouterCacheProvider>
            <Navbar />
            <main className="--font-brandon-regular">{children}</main>

            <PopUpManager />

            {/* <ShopifyAnalytics /> */}
            <CookieConsentBanner />
          </AppRouterCacheProvider>
        </body>

        <GoogleTagManager gtmId={"GTM-M4P7HMFH"} />
        <GoogleAnalytics gaId="G-NXQNHNT4T5" />
        <Script
        async
        src="https://static.klaviyo.com/onsite/js/VStMRm/klaviyo.js"
      />
      </html>
    </ThemeProvider>
  );
}
