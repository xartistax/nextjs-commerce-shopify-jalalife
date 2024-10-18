import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { getCollectionProducts, getCollections } from 'lib/shopify';
import { Suspense } from 'react';
import ReviewStars from './review-stars';

export default async function CollectionIntro() {
  const firstCategoryProducts = await getCollectionProducts({ collection: 'online-shop' });

  // Split the products into two categories (mocked for demonstration purposes)

  const collections = await getCollections();

  const filteredCollections = collections.filter(
    (collection) =>
      collection.handle !== 'online-shop' &&
      collection.title !== 'All' &&
      collection.title !== 'Herbstpaket'
  );

  // Function to render the stars based on product rating

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
        <Grid container spacing={4}>
          {/* Sidebar with Categories */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                position: 'sticky', // Keeps the sidebar sticky
                top: '1rem' // Sticks the sidebar near the top
              }}
            >
              <List component="nav">
                <ListItem button component="a" href="#category1">
                  <ListItemText primary="Einzelprodukte" />
                </ListItem>
                <ListItem button component="a" href="#category2">
                  <ListItemText primary="Gut für" />
                </ListItem>
              </List>
            </Box>
          </Grid>

          {/* Main Content Area for Products */}
          <Grid item xs={12} md={9}>
            {/* First Category */}
            <Box id="category1">
              <Grid container spacing={2} justifyContent="start">
                {firstCategoryProducts.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box
                      sx={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        border: '1px solid rgba(99, 99, 99, 0.1)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        textAlign: 'center',
                        height: '100%',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.02)' }
                      }}
                    >
                      {/* Product Image */}
                      <Box
                        component="img"
                        src={item.featuredImage.url}
                        alt={item.title}
                        sx={{
                          maxWidth: '100%',
                          marginBottom: '1rem',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                      />

                      {/* Product Title */}
                      <Typography
                        variant="h6"
                        component="h2"
                        fontWeight="bold"
                        sx={{
                          textAlign: 'center',
                          marginBottom: '0.5rem',
                          color: '#333'
                        }}
                      >
                        <Link href={`/products/${item.handle}`} color="inherit" underline="hover">
                          {item.title}
                        </Link>
                      </Typography>

                      {/* Product Reviews */}

                      <Box sx={{ mb: '1rem' }}>
                        {<ReviewStars product_id={item.id.split('/').pop()!} />}
                      </Box>

                      {/* Product Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#777',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          mb: '1.5rem'
                        }}
                      >
                        {item.description}
                      </Typography>

                      {/* Price */}
                      <Box
                        sx={{
                          justifyContent: 'center',
                          color: 'primary.main',
                          fontSize: { md: '1.2rem', xs: '1rem' },
                          fontWeight: 'bold',
                          mb: '1rem'
                        }}
                      >
                        <Price
                          amount={item.priceRange.maxVariantPrice.amount}
                          currencyCode={item.priceRange.maxVariantPrice.currencyCode}
                          comparedPriceAmount={item.compareAtPriceRange.minVariantPrice.amount}
                          align="center"
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
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 6 }} />

            {/* Second Category */}
            <Box id="category2">
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                sx={{
                  textAlign: 'left',
                  marginBottom: '2rem',
                  color: '#333'
                }}
              >
                Gut für
              </Typography>

              <Grid container spacing={2} justifyContent="start">
                {filteredCollections.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box
                      sx={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        border: '1px solid rgba(99, 99, 99, 0.1)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        textAlign: 'center',
                        height: '100%',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.02)' }
                      }}
                    >
                      {/* Product Image */}
                      <Box
                        component="img"
                        src={item.image?.url}
                        alt={item.title}
                        sx={{
                          maxWidth: '100%',
                          marginBottom: '1rem',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                      />

                      {/* Product Title */}
                      <Typography
                        variant="h6"
                        component="h2"
                        fontWeight="bold"
                        sx={{
                          textAlign: 'center',
                          marginBottom: '0.5rem',
                          color: '#333'
                        }}
                      >
                        <Link
                          href={`/collections/${item.handle}`}
                          color="inherit"
                          underline="hover"
                        >
                          {item.title}
                        </Link>
                      </Typography>

                      {/* Product Reviews */}

                      {/* Product Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#777',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          mb: '1.5rem'
                        }}
                      >
                        {item.description}
                      </Typography>

                      {/* Price */}
                      <Box
                        sx={{
                          justifyContent: 'center',
                          color: 'primary.main',
                          fontSize: { md: '1.2rem', xs: '1rem' },
                          fontWeight: 'bold',
                          mb: '1rem'
                        }}
                      ></Box>

                      {/* Add to Cart Button */}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
