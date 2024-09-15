import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { getCollection, getCollectionProducts, getProductById } from 'lib/shopify'; // Assuming Product is defined here

import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { AddToCart } from './cart/add-to-cart';
import Price from './price';

interface PageProps {
  handle: string;
}

export default async function CollectionIntro({ handle }: PageProps) {
  const collection = await getCollection(handle);
  const collectionProducts = await getCollectionProducts({ collection: handle });

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        paddingTop: '100px',
        backgroundImage: `url('Main_Banner_3840x2126_2.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Container maxWidth="lg">
        {/* Collection Title */}
        <Typography
          gutterBottom
          component="h1"
          variant="h2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 3 // margin bottom for spacing
          }}
        >
          {collection?.title}
        </Typography>

        {/* Collection Description */}
        <Typography
          variant="body2"
          fontWeight="lighter"
          sx={{
            fontSize: '18px',
            width: { xs: '100%', md: '70%' }, // Responsive width
            mb: 4 // margin bottom for spacing
          }}
        >
          {collection?.description}
        </Typography>

        {/* Divider */}
        <Box
          component="hr"
          sx={{
            border: 'none',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)', // Subtle grey line
            width: '100%',
            my: 4 // Margin Y for spacing
          }}
        />

        {/* Product Grid */}
        {collectionProducts.map(async (item, i) => {
          const compareAtPriceAmount = item.compareAtPriceRange?.minVariantPrice?.amount || null;
          let associatedProductIds = item.metafields[3]?.value || null;

          // Parse associatedProductIds if it's a string and looks like an array
          if (associatedProductIds) {
            try {
              associatedProductIds = JSON.parse(associatedProductIds);
            } catch (error) {
              console.error('Error parsing associatedProductIds', error);
            }
          }

          // Fetch associated products by ID if it's a valid array
          let associatedProducts: Product[] = [];
          if (Array.isArray(associatedProductIds) && associatedProductIds.length > 0) {
            associatedProducts = await Promise.all(
              associatedProductIds.map(async (productId: string): Promise<Product> => {
                return (await getProductById(productId)) as Product; // Assume getProductById returns Product type
              })
            );
          }

          return (
            <Grid
              container
              spacing={4}
              key={i}
              sx={{
                mb: 4, // margin bottom for each product
                alignItems: 'center' // vertically align content
              }}
            >
              {/* Product Image (Left) */}
              <Grid item xs={12} md={3}>
                <Box
                  component="img"
                  src={item.featuredImage.url}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                />
              </Grid>

              {/* Product Text (Right) */}
              <Grid item xs={12} md={9}>
                <Box paddingX={8}>
                  <Link href={`/product/${item.handle}`} underline="none">
                    <Typography
                      variant="h5"
                      component="h2"
                      fontWeight="bold"
                      sx={{
                        textAlign: 'left',
                        mb: 2, // Margin below title
                        color: 'text.primary' // Ensure link inherits text color
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>

                  {/* Associated Products */}
                  <Box mb={2}>
                    <Typography variant="body2" fontWeight={'bold'}>
                      {associatedProducts.map((product: Product, idx: number) => (
                        <span key={idx}>
                          <Link href={`/product/${product.handle}`}>{product.title}</Link>
                          {/* Only add ' || ' if it's not the last product */}
                          {idx < associatedProducts.length - 1 && ' || '}
                        </span>
                      ))}
                    </Typography>
                  </Box>
                  {/* Product Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: '900',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      mb: 2 // Margin below description
                    }}
                  >
                    {item.description}
                  </Typography>

                  {/* Product Price */}
                  <Box
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { md: '1.20rem', xs: '1rem' },
                      color: 'primary.main',
                      mb: 2 // Margin below price
                    }}
                  >
                    <Price
                      amount={item.priceRange.maxVariantPrice.amount}
                      currencyCode={item.priceRange.maxVariantPrice.currencyCode}
                      comparedPriceAmount={item.compareAtPriceRange.maxVariantPrice.amount}
                    />
                  </Box>

                  {/* Add to Cart Button */}
                  <Suspense fallback={null}>
                    <AddToCart
                      variants={item.variants}
                      availableForSale={item.availableForSale}
                      align="left"
                    />
                  </Suspense>
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Container>
    </Box>
  );
}
