"use client"
import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import indisch from '../public/indisch.png';
import IntroBgImg from './intro-bg-image';



export default function SectionIntro() {

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  
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
        

<Image 
            src={indisch}
            alt="Indischer Weihrauch mit Zink"
            loading='eager'// Required to fill the parent container
            objectFit="contain" // Maintains aspect ratio
            priority // Ensures the image is loaded eagerly
            style={{
              height: isXs ? '380px' : isLgUp ? '420px' : 'auto',
              width: 'auto',
              position: 'absolute',
              bottom: 0,
              right: isMdUp ? '10%' : 'unset',
              left: isXs ? '50%' : 'unset',
              transform: isXs ? 'translate(-50%, 0%)' : 'unset',
              display: isXs ? 'none' : 'block',
              zIndex: 1 // Ensure it appears above the background
            }}
          />
      </Container>
    </Box>
  );
}
