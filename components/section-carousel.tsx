'use client';
import { Box, BoxProps, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styled from 'styled-components';
import { toHTML } from 'utils/json-to-html';
import Prose from './prose';

const responsiveSettings = [
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }
];

interface Product {
  metafields: any;
  descriptionHtml: string;
  metafield: any;
  title: string;
  description: string;
  featuredImage?: {
    url: string;
  };
  handle: string;
}

interface PlaceholderProps extends BoxProps {
  fadeOut?: boolean;
}

export const TruncatedText = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
  img.loaded {
    opacity: 1;
  }
`;

const Placeholder = styled(({ fadeOut, ...rest }: PlaceholderProps) => <Box {...rest} />)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-out;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};
`;

const SlideContainer = styled(Box)`
  opacity: 0;
  transition: opacity 1s ease-in;
  &.fade-in {
    opacity: 1;
  }
`;

const CollectionProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderReady, setSliderReady] = useState(false);
  const [placeholderFadeOut, setPlaceholderFadeOut] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', { cache: 'no-cache' });
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
        setPlaceholderFadeOut(true); // Start fading out the placeholder
        setTimeout(() => {
          setSliderReady(true); // Make the slider visible after placeholder fades out
        }, 1000); // Match this delay with the placeholder fade-out duration
      } catch (error) {
        console.error('Error fetching collection products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          py: { xs: '30px', md: '100px' }
        }}
      >
        <Box>
          <Placeholder />
        </Box>
      </Container>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{ paddingTop: { xs: '30px', md: '30px' }, paddingBottom: { xs: '30px', md: '0px' } }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '350px', // Ensure the container has the same height as slides
            overflow: 'hidden'
          }}
        >
          {/* Placeholder that is visible while the slider is loading */}
          <Placeholder fadeOut={placeholderFadeOut} />

          <SlideContainer className={sliderReady ? 'fade-in' : ''}>
            <Slide
              duration={3000}
              transitionDuration={900}
              indicators={false}
              slidesToScroll={1}
              autoplay={true}
              slidesToShow={1}
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
                      onLoad={(e) => e.currentTarget.classList.add('loaded')}
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
                          overflow: 'hidden', // Hide overflow if title is too long
                          display: '-webkit-box',
                          WebkitLineClamp: 2, // Limits to 2 lines
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis' // Adds ellipsis if text overflows
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        component={'span'}
                        color={'primary.main'}
                        gutterBottom
                      >
                        {product.metafields[0].value}{' '}
                      </Typography>
                      <TruncatedText className="text-slate-600">
                        <Prose
                          className="leading-tight"
                          html={toHTML(product.metafields[1].value)}
                        />
                      </TruncatedText>
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
          </SlideContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default CollectionProducts;
