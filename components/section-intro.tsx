import { Box, Container, Typography } from '@mui/material';

export default async function SectionIntro() {
  return (
    <Box component="section" sx={{ width: '100%', height: {md: '100vh', xs: 'auto'} }} suppressHydrationWarning>
      <Box
  component="div"
  sx={{
    width: '100%',
    height: {
      md: '80vh',   // padding for medium devices
    },
    backgroundSize: 'cover',
    backgroundImage: {xs: `url('bg2_mobile.jpeg')`, md: `url('bg2.jpeg')`}, // Ensure the path is correct
    display: 'flex',
    
    paddingX: {
      md: '0px',   // padding for medium devices
      lg: '32px'   // padding for large devices
    },
    paddingY: {
      xs: '100px',
      md: '0px',   // padding for medium devices
      lg: '32px'   // padding for large devices
    },
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }}
>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
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
            display: { xs : 'none'}
          }}
          alt="Indischer Weihrauch mit Zink"
          src="/indisch.png"
        />
      </Container>
    </Box>
  );
}
