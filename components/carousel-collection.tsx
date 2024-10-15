// CollectionCarousel.tsx
import { Box, Container } from '@mui/material';
import { getCollections } from 'lib/shopify';
import CollectionSlider from './product/slick-slider';

const CollectionCarousel = async () => {
  const collections = await getCollections();

  // Filter out collections with the handle 'online-shop' or 'all'
  const filteredCollections = collections.filter(
    (collection) =>
      collection.handle !== 'online-shop' &&
      collection.title !== 'All' &&
      collection.title !== 'Herbstpaket'
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{ paddingTop: { xs: '30px', md: '30px' }, paddingBottom: { xs: '30px', md: '0px' } }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '450px', // Ensure the container has the same height as slides
            overflow: 'visible' // Changed to visible to avoid clipping
          }}
        >
          <CollectionSlider collections={filteredCollections} />
        </Box>
      </Box>
    </Container>
  );
};

export default CollectionCarousel;
