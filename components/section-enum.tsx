'use client';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
const items = [
  {
    title: 'Maximale Wirkung',
    content:
      'Unsere spezielle Formulierung ermöglicht es, dass bereits geringe Dosen eine maximale Wirkung entfalten.'
  },

  {
    title: 'Schutz vor der Magensäure ',
    content:
      'Dank unserer innovativen Formulierung sind die Wirkstoffe vor der Magensäure geschützt und können ungehindert vom Darm aufgenommen werden.'
  },
  {
    title: 'Verbesserte Aufnahme',
    content:
      'Durch die Wasserlöslichkeit unserer Wirkstoffe können sie effizient vom Darm aufgenommen werden.'
  },

  {
    title: 'Ohne bedenkliche Zusatzstoffe',
    content:
      'Jala-Life kommt ohne Polysorbate, Alkohol, Piperin, Zucker, Gluten, Laktose, Gelatine oder Palmöl aus und ist zudem frei von Gentechnik.'
  },

  {
    title: 'Einfache Dosierung',
    content:
      'Unsere flüssigen Jala-Life Extrakte in Tropfenform ermöglichen eine flexible und leicht anpassbare Dosierung.'
  },
  {
    title: 'Mischbar',
    content:
      'Unsere flüssigen Produkte lassen sich mit allen Getränken mischen und problemlos untereinander kombinieren.'
  }
];

export default function SectionEnum() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: '30px', md: '100px' } }}>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        sx={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5rem' }}
      >
        Was macht Jala-Life so einzigartig?
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
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '3px', // Optional: add border radius to the image
              boxShadow: 0 // Optional: add shadow to the image
            }}
          >
            {/* <StickyBox>
              <Box component={'div'} paddingTop={2}>
                <Box
                  component={'img'}
                  src={'/image3.png'}
                  width={'100%'}
                  height={'auto'}
                  borderRadius={1}
                />
              </Box>
            </StickyBox> */}

            <Box component={'div'} paddingTop={2}>
              <Box
                component={'img'}
                src={'/image3.png'}
                width={'100%'}
                height={'auto'}
                borderRadius={1}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
