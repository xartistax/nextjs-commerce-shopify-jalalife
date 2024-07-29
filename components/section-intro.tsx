import { Box, Container, Typography } from '@mui/material';
import IntroBgImg from './intro-bg-image';

export default function SectionIntro() {
  return (
    <Box
      component="section"
      sx={{ width: '100%', height: { md: '100vh', xs: 'auto' } }}
      suppressHydrationWarning
    >
      <Box
        component="div"
        sx={{
          width: '100%',
          height: {
            md: '80vh' // padding for medium devices
          },
          display: 'flex',
          position: 'relative', // Add position relative
          paddingX: {
            md: '0px', // padding for medium devices
            lg: '32px' // padding for large devices
          },
          paddingY: {
            xs: '100px',
            md: '0px', // padding for medium devices
            lg: '32px' // padding for large devices
          },
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          overflow: 'hidden' // Ensure no overflow issues
        }}
      >
        <IntroBgImg /> {/* Background image component handles responsive logic */}

        <Container maxWidth="lg" sx={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
          <Typography
            component="h1"
            gutterBottom
            color="white"
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing=".5rem"
            fontSize="57px"
            lineHeight="3.5rem"
            sx={{
              fontSize: {
                md: '3.5rem',
                xs: '2.5rem'
              },
              lineHeight: {
                md: '3.5rem',
                xs: '2.5rem'
              }
            }}
          >
            Mehr Leben!
            <br />
            Mehr Natur!
          </Typography>

          <Typography
            fontSize="18px"
            gutterBottom
            color="white"
            fontWeight="lighter"
            variant="body1"
          >
            Natürliche Wirkstoffe unterstützen deinen Körper dabei, mehr Lebensqualität und
            Vitalität zu erreichen.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box
          component="img"
          sx={{
            height: { xs: '380px', lg: '420px' },
            width: 'auto',
            position: 'absolute',
            bottom: 0,
            right: { md: '10%' },
            left: { xs: '50%', md: 'unset' },
            transform: { xs: ' translate(-50%, -0%) ', md: 'unset' },
            display: { xs: 'none', md: 'block' }
          }}
          alt="Indischer Weihrauch mit Zink"
          src="/indisch.png"
        />
      </Container>
    </Box>
  );
}
