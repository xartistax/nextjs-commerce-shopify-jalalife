// CollectionSlider.tsx
'use client';
import { Box, Typography, styled } from '@mui/material';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { Slide } from 'react-slideshow-image';
import { toHTML } from 'utils/json-to-html';

interface ProductSliderProps {
  products: Product[];
}

const responsiveSettings = [
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
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

const ImageBox = styled(Box)`
  position: relative;
  flex: 1;
  display: block;
  img {
    max-height: 100%;
    height: 100%;
    width: auto;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const [slidesToShow, setSlidesToShow] = useState(1);

  // Effect to handle slide responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3); // or whatever your default is
      }
    };

    // Set initial slidesToShow value
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Slide
      duration={3000}
      transitionDuration={900}
      indicators={false}
      slidesToScroll={1}
      autoplay={true}
      slidesToShow={slidesToShow} // Use dynamic slidesToShow
      arrows={false}
      responsive={responsiveSettings}
    >
      {products.map((product, index) => (
        <Box
          key={index}
          className="each-slide"
          sx={{
            textAlign: 'left',
            display: 'flex',
            minHeight: '350px',
            height: 'auto',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'stretch'
          }}
        >
          <ImageBox sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Box
              component="img"
              alt={product.title}
              src={product.featuredImage?.url || '/placeholder-image.png'}
              loading="lazy"
              className="image"
              sx={{
                display: { xs: 'none', sm: 'block' },
                height: '100%',
                maxHeight: '400px',
                objectFit: 'cover'
              }}
            />
          </ImageBox>

          <Box
            sx={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '16px'
            }}
          >
            <div>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  className: 'text-slate-800',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {product.title}
              </Typography>
              <Typography variant="body2" component={'span'} color={'primary.main'} gutterBottom>
                {product.metafields[0] && product.metafields.length ? (
                  <div>{product.metafields[0].value}</div>
                ) : (
                  <div>No metafields available</div>
                )}
              </Typography>

              {product.metafields[1] && product.metafields.length ? (
                <Prose className="leading-tight" html={toHTML(product.metafields[1].value)} />
              ) : (
                <></>
              )}
              <Typography
                component="a"
                href={`/products/${product.handle}`}
                sx={{
                  display: 'block',
                  textAlign: { md: 'left', xs: 'left' },
                  fontWeight: { md: 'inherit', xs: 'bold' },
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  paddingTop: { md: '20px', xs: '20px' },
                  color: 'primary.main'
                }}
              >
                Zum Produkt
              </Typography>
            </div>
          </Box>
        </Box>
      ))}
    </Slide>
  );
};

export default ProductSlider;
