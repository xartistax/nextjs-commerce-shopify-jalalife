// pages/product/[handle].tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Box, CircularProgress, Container, Grid, Paper, ThemeProvider } from '@mui/material';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import ReviewForm from 'components/review-form';
import { SingleProductInformations } from 'components/single-product-informations';
import SpeedDialVisibility from 'components/speed-dial-visibility';
import StickyBox from 'components/sticky-component';

import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
import { Suspense } from 'react';
import { theme } from 'theme';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({
  params,
  searchParams
}: {
  params: { handle: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />

      <Container maxWidth="lg">
        <SpeedDialVisibility
          targetId="product-info-section"
          title={product.title}
          imageSrc={product.featuredImage.url}
        />

        <Paper elevation={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} sx={{ overflow: 'scroll', paddingBottom: '100px' }}>
              <StickyBox>
                <Box component={'div'} sx={{ py: '50px' }}>
                  <Suspense
                    fallback={
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '1',
                          maxHeight: 'auto',
                          overflow: 'hidden',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    }
                  >
                    <Gallery
                      images={product.images.map((image) => ({
                        src: image.url,
                        altText: image.altText
                      }))}
                    />
                  </Suspense>
                </Box>
              </StickyBox>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Pass searchParams to ProductDescription */}
              <ProductDescription product={product} searchParams={searchParams} />

              

              <Box
                id="judgeme_product_reviews"
                className="jdgm-widget jdgm-review-widget"
                data-id="{{ product.id }}"
              >
                <ReviewForm product={product} />
              </Box>
            </Grid>
          </Grid>
        </Paper>



       

        <Box mt={3} id="product-info-section">
          <SingleProductInformations product={product} />
        </Box>
      </Container>

      <Footer />
    </ThemeProvider>
  );
}
