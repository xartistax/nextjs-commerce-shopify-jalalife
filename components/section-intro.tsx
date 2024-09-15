'use client';
import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

interface SectionIntroProps {
  heading: React.ReactNode;
  size: string;
}

export default function SectionIntro({ heading, size }: SectionIntroProps) {
  return (
    <>
      <Head>
        {/* Preload Video */}
        <link rel="preload" href={'/Bamboo_Forest.mp4'} as="video" />
      </Head>
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
              md: size // height for medium devices
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
          <video
            poster={'/poster2.jpg'}
            autoPlay
            loop
            muted
            playsInline
            width="320"
            height="240"
            preload="metadata"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1
            }}
          >
            <source src={'/jala_life_bioverfugbarkeit.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Black overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Black with 50% opacity
              zIndex: 0 // Ensures overlay is on top of the video but below content
            }}
          />

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
              {heading}
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}
