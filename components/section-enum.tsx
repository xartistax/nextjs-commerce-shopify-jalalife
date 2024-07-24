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
    <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: '2' ,md: '0'}, py: 0 }}>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        sx={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5rem' }}
      >
        Was macht Jala-Life einzigartig?
      </Typography>
      <Grid container spacing={4} sx={{ listStyle: 'none', width: '100%' }}>
        {items.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                paddingBottom: { xs: '0' ,md: '3rem'},
                paddingLeft: { xs: '6rem' ,md: '4rem'},
                position: 'relative',
                '&::before': {
                  content: `'${index + 1}'`, // Manual counter
                  width: { xs: '4rem' ,md: '5rem'},
                  height: { xs: '4rem' ,md: '5rem'},
                  background: theme.palette.primary.main,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '1.5rem' ,md: '2rem'},
                  color: 'white',
                  marginBottom: '1rem',
                  position: 'absolute',
                  top: { xs: '0' ,md: '-1rem'},
                  left: { xs: '0rem' ,md: '-2rem'},
                  zIndex: 1
                },
                '&::after': {
                  content: '""',
                  width: '1.5rem',
                  height: '1.5rem',
                  background: theme.palette.primary.main,
                  zIndex: -1,
                  position: 'absolute',
                  top: '1rem',
                  left: { xs: '3.5rem' ,md: '0'},
                  display: { xs: 'none' ,md: 'block'},
                  borderTopLeftRadius: '3px'
                }
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                lineHeight={1}
                fontWeight={'bold'}
              >
                {item.title}
              </Typography>
              <Typography variant="body1" component={'p'} fontWeight={'light'} sx={{}}>
                {item.content}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
