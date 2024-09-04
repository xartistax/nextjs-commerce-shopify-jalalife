'use client';
import { Box, Container } from '@mui/material';
import FullScreenDialog from './fullscreen-dialog';

export default function WirkstoffFinder() {
  const handleClose = () => {
    console.log('Dialog closed');
  };

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
        <FullScreenDialog
          openButtonLabel="Welches Produkt passt zu mir?"
          title="Wirkstoffinder"
          onClose={handleClose}
        />
      </Box>
    </Container>
  );
}
