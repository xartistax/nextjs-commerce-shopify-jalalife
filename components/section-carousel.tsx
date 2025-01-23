// app/collection-products/page.js (if you are using a folder structure)
import { Box, Container } from '@mui/material';
import { getCollectionProducts } from 'lib/shopify'; // Ensure you import your fetching function
import ProductSlider from './product/slick-slider-products'; // Adjust the path based on your structure

const CollectionProducts = async () => {
  // Fetch products directly in the component
  const products = await getCollectionProducts({ collection: 'online-shop' });



  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        py: '50px',
      }}
    >
      <Box
       
      >
        <Box
          sx={{
            position: 'relative',
            height: '350px', // Ensure the container has the same height as slides
            overflow: 'hidden'
          }}
        >
          <ProductSlider products={products} />
        </Box>
      </Box>
    </Container>
  );
};

export default CollectionProducts;
