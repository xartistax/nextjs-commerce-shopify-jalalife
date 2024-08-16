'use client';
import { Box, BoxProps, Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styled from 'styled-components';

interface Product {
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

const TruncatedText = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImageBox = styled(Box)`
  position: relative;
  flex: 1;
  display: block;
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
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

  const responsiveSettings = [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
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
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            paddingTop: { xs: '30px', md: '100px' },
            paddingBottom: { xs: '30px', md: '100px' }
          }}
        >
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
        sx={{ paddingTop: { xs: '30px', md: '100px' }, paddingBottom: { xs: '30px', md: '100px' } }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '400px', // Ensure the container has the same height as slides
            overflow: 'hidden'
          }}
        >
          {/* Placeholder that is visible while the slider is loading */}
          <Placeholder fadeOut={placeholderFadeOut} />

          <SlideContainer className={sliderReady ? 'fade-in' : ''}>
            <Slide
              duration={5000}
              transitionDuration={300}
              indicators={false}
              slidesToScroll={1}
              slidesToShow={1}
              responsive={responsiveSettings}
            >
              {products.map((product, index) => (
                <Box
                  key={index}
                  className="each-slide"
                  sx={{
                    textAlign: 'left',
                    display: 'flex',
                    minHeight: '400px',
                    height: 'auto',
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <ImageBox>
                    <Box
                      component="img"
                      alt={product.title}
                      src={product.featuredImage?.url || '/placeholder-image.png'}
                      loading="lazy"
                      className="image"
                      onLoad={(e) => e.currentTarget.classList.add('loaded')}
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
                        gutterBottom
                        variant="h4"
                        component="h2"
                        sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                        className="text-slate-800"
                      >
                        {product.title}
                      </Typography>
                      <TruncatedText className="text-slate-600" sx={{ textAlign: 'justify' }}>
                        {product.description}
                      </TruncatedText>
                      <Typography
                        component="a"
                        href={`/product/${product.handle}`}
                        sx={{
                          display: 'block',
                          textAlign: { md: 'right', xs: 'left' },
                          fontWeight: { md: 'inherit', xs: 'bold' },
                          fontSize: '16px',
                          textTransform: 'uppercase',
                          paddingTop: { md: '50px', xs: '20px' },
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
            <Button
              variant="outlined"
              href="/collections/online-shop"
              size="large"
              sx={{ marginTop: '3rem', fontWeight: 'bold' }}
            >
              Jetzt zum Shop
            </Button>
          </SlideContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default CollectionProducts;
