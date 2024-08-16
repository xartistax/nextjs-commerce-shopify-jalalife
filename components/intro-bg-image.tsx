'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react'; // Import useState
import bg2 from '../public/bg2.webp';
import bg1 from '../public/bg2_mobile.webp';

export default function IntroBgImg() {
  const theme = useTheme();
  const isXs = useMediaQuery(() => theme.breakpoints.down('md'));
  const [bgLoaded, setBgLoaded] = useState(false); // Track background image load state

  return (
    <>
      <Image
        src={isXs ? bg1 : bg2}
        placeholder="blur"
        fill
        loading="eager"
        sizes="80vw"
        style={{
          objectFit: 'cover',
          zIndex: -1,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: bgLoaded ? 1 : 0, // Hide the image initially
          transition: 'opacity 1s ease-in-out' // Fade-in effect
        }}
        alt=""
        onLoad={() => setBgLoaded(true)} // Set the background load state to true once it's loaded
      />
    </>
  );
}
