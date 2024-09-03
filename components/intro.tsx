import { Box, Container, Grid, Link, Typography } from '@mui/material';
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
        sx={{ width: '100%', minheight: '100vh', height: 'auto', paddingTop: '100px' }}
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
              <Container maxWidth="lg" sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <Typography
                  gutterBottom
                  component={'h1'}
                  variant="h2"
                  fontWeight={'bold'}
                  lineHeight={'1'}
                  sx={{ fontSize: { xs: '2rem' } }}
                >
                  {collection?.title}
                </Typography>

                <Typography
                  variant="body2"
                  component="p"
                  fontSize="18px"
                  gutterBottom
                  color="inherit"
                  fontWeight="lighter"
                  sx={{ fontSize: { md: '18px', xs: 'inherit' } }}
                >
                  {collection?.description}
                </Typography>

                <Grid
                  container
                  justifyContent="start"
                  spacing={3}
                  sx={{ paddingTop: { xs: '1rem', md: '6rem' } }}
                >
                  {collectionProducts.map((item, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
                      <Box
                        component="div"
                        sx={{
                          backgroundColor: 'white',
                          padding: '1rem'
                        }}
                      >
                        <Box
                          component="img"
                          src={item.featuredImage.url}
                          alt={item.title}
                          margin={'auto'}
                          sx={{
                            maxWidth: { md: '200px', xs: '100%' },
                            display: { xs: 'none', md: 'block' }
                          }}
                        />
                        <Box component="div" sx={{ paddingY: '3rem' }}>
                          <Link href={`/product/${item.handle}`}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              textAlign="center"
                              fontWeight="bold"
                              sx={{
                                textAlign: { xs: 'left', md: 'center' },
                                fontSize: { md: '1.20rem', xs: 'inherit' }
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Link>

                          <Box
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontSize: { md: '1.20rem' }
                            }}
                          >
                            <Typography variant="body1"> {item.description} </Typography>
                          </Box>
                        </Box>

                        <Box
                          component="div"
                          className="mr-auto w-auto text-sm"
                          fontWeight={'bold'}
                          sx={{
                            color: 'primary.main',
                            fontSize: { md: '1.20rem', xs: '1.2rem' },
                            paddingBottom: '32px'
                          }}
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
