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
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{ paddingTop: { xs: '30px', md: '30px' }, paddingBottom: { xs: '30px', md: '100px' } }}
      >
        <FullScreenDialog
          openButtonLabel="Welcher Wirkstoff passt zu dir?"
          title="Wirkstoffinder"
          onClose={handleClose}
        />
      </Box>
    </Container>
  );
}
