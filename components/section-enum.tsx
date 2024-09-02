'use client';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';

const items = [
  { title: 'Wirkstoffe', content: 'Die Wirkstoffe sind vor der Magensäure geschützt.' },
  { title: 'Verdauung', content: 'Bestmögliche Verteilung der Wirkstoffe im Darm' },
  { title: 'Aufnahme', content: 'Schnelle und optimale Aufnahme in den Körper' },
  { title: 'Dosierung', content: 'Flüssig/Tropfen – somit leicht dosierbar' },
  { title: 'Mischbar', content: 'Kann mit Getränken gemischt werden' },
  {
    title: 'Ohne Zusatzstoffe',
    content: 'Frei von Piperin, Glycerin, Polysorbate, Alkohol und Zucker'
  },
  { title: 'Maximale Wirkung', content: 'Geringe Dosen sind bereits ausreichend' },
  { title: 'Verträglich', content: 'Glutenfrei und vegan' }
];

export default function SectionEnum() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ position: 'relative', py: 0 }}>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        sx={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5rem' }}
      >
        Was macht Jala-Life einzigartig?
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            {items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  paddingBottom: { xs: '0', md: '3rem' },
                  position: 'relative',
                  '&::before': {
                    content: `'${index + 1}'`, // Manual counter
                    width: { xs: '2rem', md: '3rem' },
                    height: { xs: '2rem', md: '3rem' },
                    background: theme.palette.primary.main,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '1rem', md: '1.5rem' },
                    color: 'white',
                    marginBottom: '1rem',
                    position: 'absolute',

                    zIndex: 1
                  }
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  lineHeight={1}
                  fontWeight={'bold'}
                  sx={{ paddingLeft: '5rem' }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  component={'p'}
                  fontWeight={'light'}
                  sx={{ paddingLeft: '5rem' }}
                >
                  {item.content}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Replace 'your-image-url.jpg' with the path to your image */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(jalalife_2.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '3px', // Optional: add border radius to the image
              boxShadow: 0 // Optional: add shadow to the image
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
