import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { getCollectionProducts } from 'lib/shopify';
import { Suspense } from 'react';

export default async function CollectionIntro() {
  const collectionProducts = await getCollectionProducts({ collection: 'online-shop' });

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        height: 'auto',
        backgroundColor: '#f8f9fa',
        py: { xs: 3, md: 6 } // Padding top and bottom
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          gutterBottom
          component={'h1'}
          variant="h2"
          fontWeight={'bold'}
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            textAlign: { xs: 'left', md: 'center' },
            mb: { xs: 4, md: 6 } // Margin bottom for spacing from title to content
          }}
        >
          Next Generation Plant-Extract
        </Typography>

        {/* Product Grid */}
        <Grid container spacing={1} justifyContent="center">
          {collectionProducts.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  border: '1px solid rgba(99, 99, 99, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  height: '100%'
                }}
              >
                {/* Product Image */}
                <Box
                  component="img"
                  src={item.featuredImage.url}
                  alt={item.title}
                  sx={{
                    maxWidth: { md: '200px', xs: '100%' },
                    marginBottom: '1rem',
                    objectFit: 'contain',
                    margin: 'auto'
                  }}
                />

                {/* Product Title */}
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  sx={{
                    textAlign: { xs: 'center', md: 'center' },
                    display: 'block' // Ensures the title takes full width (block element)
                    // Ensure margin below title so description stays underneath
                  }}
                >
                  <Link href={`/product/${item.handle}`} color="inherit" underline="hover">
                    {item.title}
                  </Link>
                </Typography>

                <Typography sx={{ fontWeight: 'bold', mb: '1rem', color: 'primary.main' }}>
                  {' '}
                  {item.metafields[0]?.value}{' '}
                </Typography>

                {/* Product Description */}
                <Typography
                  variant="body1"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mb: '1.5rem' // Margin below description
                  }}
                >
                  {item.description}
                </Typography>

                {/* Price */}
                <Box
                  sx={{
                    justifyContent: 'center',
                    color: 'primary.main',
                    fontSize: { md: '1.20rem', xs: '1rem' },
                    fontWeight: 'bold',
                    mb: '1rem'
                  }}
                >
                  <Price
                    amount={item.priceRange.maxVariantPrice.amount}
                    currencyCode={item.priceRange.maxVariantPrice.currencyCode}
                    comparedPriceAmount={item.compareAtPriceRange.minVariantPrice.amount}
                  />
                </Box>

                {/* Add to Cart Button */}
                <Suspense fallback={null}>
                  <AddToCart
                    variants={item.variants}
                    availableForSale={item.availableForSale}
                    align="right"
                  />
                </Suspense>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
