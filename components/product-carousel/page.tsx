import { Box, Container } from '@mui/material';
import ProductSlider from 'components/product/slick-slider-products';
import { getCollectionProducts } from 'lib/shopify';




export default async function CollectionProducts(){

  // Fetch products directly in the component
  const products = await getCollectionProducts({ collection: 'online-shop' });





  return (
    <Container
      maxWidth="lg"
      
    >
      <Box>
        <Box
         
        >
          <ProductSlider products={products} />
        </Box>
      </Box>
    </Container>
  );
};


