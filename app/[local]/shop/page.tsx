'use client ';
import { ThemeProvider } from '@mui/material/styles';
import Shop from 'components/shop';

import dynamic from 'next/dynamic';
import 'react-slideshow-image/dist/styles.css';
import { theme } from 'theme';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function Page() {
  const Footer = dynamic(() => import('components/layout/footer'), { ssr: false });

  return (
    <>
      <ThemeProvider theme={theme}>
        <main>
          <Shop />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}
