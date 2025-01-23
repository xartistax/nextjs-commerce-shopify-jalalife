'use client';
import { Box, Typography } from '@mui/material';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import React from 'react';
import Slider from 'react-slick';
import { toHTML } from 'utils/json-to-html';
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
  };

  return (
    <Box >
      <Slider {...settings}>
        {products.map((product, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'left',
              flexDirection: 'row',
              alignItems: 'start',
              display: 'flex !important',
              height: '400px', // Set a fixed height for the slides
              padding: 2, // Add padding if needed
              boxSizing: 'border-box', // Ensure proper sizing
            }}
          >
            {/* Image on the left */}
            <Box
              sx={{
                flex: '0 0 200px', // Fixed width for the left box
               
                height: '100%', // Match the height of the container
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              <Box component={'img'} src={product.featuredImage.url} />
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
            justifyContent: 'start', // Center the content vertically
           
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
