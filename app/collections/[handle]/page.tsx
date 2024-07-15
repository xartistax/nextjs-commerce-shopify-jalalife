'use client ';
import { ThemeProvider } from '@mui/material/styles';
import CollectionIntro from 'components/intro';

import dynamic from 'next/dynamic';
import 'react-slideshow-image/dist/styles.css';
import { theme } from 'theme';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
interface PageProps {
  params: {
    handle: string;
  };
}
export default async function Page({ params }: PageProps) {
  const Footer = dynamic(() => import('components/layout/footer'), { ssr: false });

  return (
    <>
      <ThemeProvider theme={theme}>
        <main>
          <CollectionIntro handle={params.handle} />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}
