'use client';
import { Box, Container, Typography } from '@mui/material';
import FullScreenDialog from './fullscreen-dialog';

export default function WirkstoffFinder() {
  const handleClose = () => {
    console.log('Dialog closed');
  };

  const content = (
    <>
      <Typography>Wirkstoffinder goes here</Typography>
    </>
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
        sx={{ paddingTop: { xs: '30px', md: '30px' }, paddingBottom: { xs: '30px', md: '100px' } }}
      >
        <FullScreenDialog
          openButtonLabel="Welcher Wirkstoff passt zu dir?"
          title="Wirkstoffinder"
          content={content}
          onClose={handleClose}
        />
      </Box>
    </Container>
  );
}
