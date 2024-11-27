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

  // Check if the collection is hidden

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
          component="h1"
          variant="h2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          {collection?.title}
        </Typography>
        <Typography gutterBottom sx={{ color: 'primary.main', fontWeight: '900', mb: 3 }}>
          {' '}
          Mehr Wirkung, mehr Ersparnis!{' '}
        </Typography>

        {/* Collection Description */}
        <Typography
          variant="body2"
          fontWeight="lighter"
          sx={{
            fontSize: '18px',
            width: { xs: '100%', md: '70%' },
            mb: 4
          }}
        >
          {collection?.description}
        </Typography>

        {/* Divider */}
        <Box
          component="hr"
          sx={{
            border: 'none',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            width: '100%',
            my: 4
          }}
        />

        {/* Product Grid */}

        {collectionProducts.length === 0 ? (
          <Grid
            container
            spacing={4}
            key="no-products-message" // Use a unique key for the message
            sx={{
              mb: 4,
              alignItems: 'center',
              justifyContent: 'center' // Center the message
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: 'text.primary', textAlign: 'left', padding: '2rem', width: '100%' }}
            >
              Wir bereiten dieses Paket für Sie gerade vor.
            </Typography>
          </Grid>
        ) : (
          collectionProducts.map(async (item, i) => {
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
                  return (await getProductById(productId)) as Product;
                })
              );
            }

            return (
              <Grid
                container
                spacing={4}
                key={i}
                sx={{
                  mb: 4,
                  alignItems: 'center'
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
                  <Box paddingX={0}>
                    <Link href={`/products/${item.handle}`} underline="none">
                      <Typography
                        variant="h5"
                        component="h2"
                        fontWeight="bold"
                        sx={{
                          textAlign: 'left',
                          mb: 2,
                          color: 'text.primary'
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
                            <Link href={`/products/${product.handle}`}>{product.title}</Link>
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
                        WebkitLineClamp: 100,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        mb: 2
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
                        mb: 2
                      }}
                    >
                      <Price
                        amount={item.priceRange.maxVariantPrice.amount}
                        currencyCode={item.priceRange.maxVariantPrice.currencyCode}
                        comparedPriceAmount={item.compareAtPriceRange.maxVariantPrice.amount}
                        align="start" hasNoOptionsOrJustOneOption={!item.options.length || (item.options.length === 1 && item.options[0]?.values.length === 1)}                      />
                    </Box>

                    {/* Add to Cart Button */}
                    <Suspense fallback={null}>
                      <AddToCart
                        variants={item.variants}
                        availableForSale={item.availableForSale}
                        align="left" hasNoOptionsOrJustOneOption={!item.options.length || (item.options.length === 1 && item.options[0]?.values.length === 1)}
                        handle={item.handle} 
                        origin={'online-shop'}                      />
                    </Suspense>
                  </Box>
                </Grid>
              </Grid>
            );
          })
        )}
      </Container>
    </Box>
  );
}
