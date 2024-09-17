'use client';
import { Box, Button, Container } from '@mui/material';

export const handleFullScreenClose = () => {
  console.log('Dialog closed');
};

export default function WirkstoffFinder() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        py: { xs: '30px', md: '100px' }
      }}
    >
      <Box sx={{}}>
        <Button href="/shop" variant="outlined" size="large" sx={{ mr: 1 }}>
          {' '}
          Zum Shop{' '}
        </Button>
      </Box>
    </Container>
  );
}
