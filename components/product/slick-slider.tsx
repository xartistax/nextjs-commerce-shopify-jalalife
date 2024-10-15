// CollectionSlider.tsx
'use client';
// Import necessary types from React
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Collection } from 'lib/shopify/types';
import Link from 'next/link'; // Import the Link component from Next.js
import React from 'react';
import { Slide } from 'react-slideshow-image';

// Define an interface for the component props
interface CollectionSliderProps {
  collections: Collection[]; // An array of collection items
  duration?: number; // Optional duration prop
  transitionDuration?: number; // Optional transition duration prop
  indicators?: boolean; // Optional indicators prop
  autoplay?: boolean; // Optional autoplay prop
  slidesToShow?: number; // Optional slides to show prop
  slidesToScroll?: number; // Optional slides to scroll prop
  arrows?: boolean; // Optional arrows prop
}

// Responsive settings for the slider
const responsiveSettings = [
  {
    breakpoint: 1280, // Change to 1280px for larger screens
    settings: {
      slidesToShow: 4, // Show 4 slides on larger screens
      slidesToScroll: 4 // Scroll 4 slides at a time
    }
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 3, // Show 3 slides on medium screens
      slidesToScroll: 3
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1, // Show 1 slide on small screens
      slidesToScroll: 1
    }
  }
];

// Dynamic Slider Component
const CollectionSlider: React.FC<CollectionSliderProps> = ({
  collections,
  duration = 3000,
  transitionDuration = 1200,
  indicators = false,
  autoplay = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  arrows = false
}) => {
  return (
    <Grid container spacing={2}>
      {/* Right Section with Slider */}
      <Grid item xs={12} md={12}>
        <Slide
          duration={duration}
          transitionDuration={transitionDuration}
          indicators={indicators}
          slidesToScroll={slidesToScroll}
          autoplay={autoplay}
          slidesToShow={slidesToShow}
          arrows={arrows}
          responsive={responsiveSettings}
        >
          {collections.map((collection, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                borderRadius: 2,
                boxShadow: 1,
                transition: 'transform 0.3s',
                margin: '0 8px', // Add horizontal margin
                '&:hover': {
                  transform: 'scale(1.05)' // Slight zoom effect on hover
                }
              }}
            >
              <CardMedia
                component="img"
                height="130"
                image={collection.image?.url} // Use the image URL from your collection item
                alt={collection.title}
              />
              <CardContent>
                <Link key={index} href={`/collections/${collection.handle}`} passHref>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      mb: 1,
                      color: 'primary.main'
                    }}
                  >
                    {collection.title}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Slide>
      </Grid>
    </Grid>
  );
};

export default CollectionSlider;
