import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ensureStartsWith } from 'lib/utils';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { theme } from 'theme';
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
        <body
          className={`bg-white text-black selection:bg-customColor selection:text-white ${myFont.variable}`}
        >
          <AppRouterCacheProvider>
            <Navbar />
            <main className="--font-brandon-regular">{children}</main>
            {/* <ShopifyAnalytics /> */}
          </AppRouterCacheProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
