'use client';
import { Box, Typography } from '@mui/material';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import dynamic from 'next/dynamic';
import React from 'react';
import { toHTML } from 'utils/json-to-html';

// Dynamically import react-slick without SSR
const Slider = dynamic(() => import('react-slick'), { ssr: false });

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      {/* Render the slider only after client-side hydration */}
      <Slider {...settings}>
        {products.map((product, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'left',
              flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, row on larger screens
              alignItems: 'start',
              display: 'flex !important',
              height: { xs: '500px', sm: '400px' }, // Set a fixed height for the slides
              padding: 2, // Add padding if needed
              boxSizing: 'border-box', // Ensure proper sizing
            }}
          >
            {/* Image on the left */}
            <Box
              sx={{
                flex: { xs: '0 0 auto', sm: '0 0 200px' }, // Adjust flex for mobile
                height: { xs: 'auto', sm: '100%' }, // Adjust height for mobile
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'start' },
                alignItems: 'center',
              }}
            >
              <Box
                component={'img'}
                src={product.featuredImage.url}
                sx={{
                  width: { xs: '50%', sm: '100%' }, // Responsive width
                }}
              />
            </Box>

            {/* Content on the right */}
            <Box
              sx={{
                flex: 1, // Take up the remaining space
                height: '100%', // Match the height of the container
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  flex: 1, // Take up the remaining space
                  display: 'flex',
                  flexDirection: 'column', // Stack the text vertically
                  justifyContent: 'start', // Align to top
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  component="span"
                  color="primary.main"
                  gutterBottom
                  sx={{ marginTop: '20px' }}
                >
                  {product.metafields[0] && product.metafields.length ? (
                    <div>{product.metafields[0].value}</div>
                  ) : (
                    <div>No metafields available</div>
                  )}
                </Typography>

                {product.metafields[1] && product.metafields.length ? (
                  <Prose html={toHTML(product.metafields[1].value)} />
                ) : null}

                <Typography
                  component="a"
                  href={`/products/${product.handle}`}
                  sx={{
                    display: 'block',
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    color: 'primary.main',
                    marginTop: 2,
                  }}
                >
                  Zum Produkt
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductSlider;
