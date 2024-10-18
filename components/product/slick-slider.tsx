'use client';

import { Box, Grid, Link, Typography } from '@mui/material';
import ReviewStars from 'components/review-stars';
import { Collection } from 'lib/shopify/types';
import React from 'react';
import { Slide } from 'react-slideshow-image';

interface CollectionSliderProps {
  collections: Collection[];
  duration?: number;
  transitionDuration?: number;
  indicators?: boolean;
  autoplay?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  arrows?: boolean;
}

const responsiveSettings = [
  {
    breakpoint: 1280,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
];

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
      <Grid item xs={12}>
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
            <Box
              key={index}
              sx={{
                padding: '1rem', // Add padding around each slide
                boxSizing: 'border-box',
                width: '100%' // Ensure the slides take full width within their container
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  border: '1px solid rgba(99, 99, 99, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
              >
                {/* Product Image */}
                <Box
                  component="img"
                  src={collection.image?.url}
                  alt={collection.title}
                  sx={{
                    maxWidth: '100%',
                    marginBottom: '1rem',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                />

                {/* Product Title */}
                <Typography
                  variant="h6"
                  component="h2"
                  fontWeight="bold"
                  sx={{
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                    color: '#333'
                  }}
                >
                  <Link
                    href={`/collections/${collection.handle}`}
                    color="inherit"
                    underline="hover"
                  >
                    {collection.title}
                  </Link>
                </Typography>

                {/* Placeholder for Reviews */}
                <Box sx={{ mb: '1rem' }}>
                  <ReviewStars starCount={4} />
                </Box>

                {/* Product Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#777',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mb: '1.5rem'
                  }}
                >
                  {collection.description}
                </Typography>

                {/* Placeholder for Price or other content */}
                <Box
                  sx={{
                    justifyContent: 'center',
                    color: 'primary.main',
                    fontSize: { md: '1.2rem', xs: '1rem' },
                    fontWeight: 'bold',
                    mb: '1rem'
                  }}
                >
                  {/* Additional content can be added here */}
                </Box>
              </Box>
            </Box>
          ))}
        </Slide>
      </Grid>
    </Grid>
  );
};

export default CollectionSlider;
