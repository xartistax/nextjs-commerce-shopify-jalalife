"use client"
import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import bg2 from '../public/bg2.jpeg';
import bg1 from '../public/bg2_mobile.jpeg';


export default function IntroBgImg() {
  const theme = useTheme();
  const isXs = useMediaQuery(() => theme.breakpoints.down('md'));

  return (
    <Image 
      src={isXs ? bg1 : bg2}
      placeholder="blur"
      fill
      loading="eager"
      sizes="80vw"
      style={{
        objectFit: 'cover',
        zIndex: -1,
        position: 'absolute', // Make it absolute to cover the parent
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover'
      }} 
      alt=""
    />
  );
}
