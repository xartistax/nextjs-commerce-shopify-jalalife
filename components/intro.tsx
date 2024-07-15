import { Box, Container, Grid, Typography } from '@mui/material';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Suspense } from 'react';

interface PageProps {
  handle: string;
}

export default async function CollectionIntro({ handle }: PageProps) {
  const collection = await getCollection(handle);
  const collectionProducts = await getCollectionProducts({ collection: handle });

  return (
    <>
      <Box
        component="section"
        sx={{ width: '100%', minheight: '100vh', height: 'auto', paddingTop: '1rem' }}
      >
        <Box
          component="div"
          sx={{
            width: '100%',
            minHeight: '100vh',
            height: 'auto',
            backgroundSize: 'cover',
            backgroundImage: `url('Main_Banner_3840x2126_2.webp')`,
            display: 'flex',
            padding: '32px',
            justifyContent: 'start',
            alignItems: 'start',
            textAlign: 'left'
          }}
        >
          <Box component="section" sx={{ width: '100%', minheight: '100vh', height: 'auto' }}>
            <Box
              component="div"
              sx={{
                width: '100%',
                height: 'auto',
                backgroundSize: 'cover',
                backgroundImage: `url('Main_Banner_3840x2126_2.webp')`,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                textAlign: 'left'
              }}
            >
              <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Typography
                  component="h1"
                  gutterBottom
                  textTransform="uppercase"
                  fontWeight="bold"
                  letterSpacing=".5rem"
                  fontSize="57px"
                  lineHeight="3.5rem"
                  sx={{
                    fontSize: {
                      md: '3.5rem',
                      xs: '2.5rem'
                    },
                    lineHeight: {
                      md: '3.5rem',
                      xs: '2.5rem'
                    }
                  }}
                >
                  {collection?.title}
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  fontSize="18px"
                  gutterBottom
                  color="inherit"
                  fontWeight="lighter"
                >
                  {collection?.description}
                </Typography>

                <Grid container justifyContent="start" spacing={3} sx={{ paddingTop: '6rem' }}>
                  {collectionProducts.map((item, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
                      <Box
                        component="div"
                        sx={{
                          backgroundColor: 'white',
                          padding: '1rem',
                          borderColor: 'rgba(99, 99, 99, 0.1)',
                          border: '1px solid rgba(99, 99, 99, 0.1)'
                        }}
                      >
                        <Box
                          component="img"
                          src={item.featuredImage.url}
                          alt={item.title}
                          sx={{ maxWidth: '200px', margin: 'auto' }}
                        />
                        <Box component="div" sx={{ paddingY: '3rem' }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            fontSize="1.20rem"
                            textAlign="center"
                            fontWeight="bold"
                          >
                            {item.title}
                          </Typography>
                          <Box
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {item.description}
                          </Box>
                        </Box>

                        <Box
                          component="div"
                          className="mr-auto w-auto p-2 text-sm"
                          sx={{ color: 'primary.main' }}
                        >
                          <Price
                            amount={item.priceRange.maxVariantPrice.amount}
                            currencyCode={item.priceRange.maxVariantPrice.currencyCode}
                          />
                        </Box>
                        <Suspense fallback={null}>
                          <AddToCart
                            variants={item.variants}
                            availableForSale={item.availableForSale}
                          />
                        </Suspense>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
