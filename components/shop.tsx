import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Suspense } from 'react';



export default async function CollectionIntro() {
  const collection = await getCollection('online-shop');
  const collectionProducts = await getCollectionProducts({ collection: 'online-shop' });

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
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                textAlign: 'left'
              }}
            >
              <Container maxWidth="lg" sx={{ textAlign: { xs: 'left' ,md: 'center'} }}>
              <Typography  gutterBottom component={'h1'} variant='h2' fontWeight={'bold'} lineHeight={'1'} sx={{ fontSize: {xs: '2rem'} }}>
                  Next Generation Plant-Extract
                </Typography>

               

                <Grid container justifyContent="start" spacing={3} sx={{ paddingTop: { xs: '1rem' ,md: '6rem'} }}>
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
                          margin={'auto'}
                          sx={{ maxWidth: { md: '200px', xs: '100%' }, display: {xs: 'none', md: 'block'} }}
                         
                        />
                        <Box component="div" sx={{ paddingY: '3rem' }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            textAlign="center"
                            fontWeight="bold"
                            sx={{ textAlign:{ xs: 'left' ,md: 'center'} , fontSize: {md: '1.20rem' ,xs: 'inherit'} }}
                          >
                            <Link href={`/product/${item.handle}`}> {item.title} </Link>
                          </Typography>
                          <Box
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontSize: {md: '1.20rem' } 
                            }}
                          >
                            {item.description}
                          </Box>
                        </Box>

                        <Box
                          component="div"
                          className="mr-auto w-auto text-sm"
                          fontWeight={"bold"}
                          sx={{ color: 'primary.main', fontSize: {md: '1.20rem' ,xs: '1.2rem'} , paddingBottom: '32px' }}
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
