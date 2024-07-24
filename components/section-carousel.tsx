'use client';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import TextTruncate from 'react-text-truncate';

interface Product {
  title: string;
  description: string;
  featuredImage?: {
    url: string;
  };
  handle: string;
}

const CollectionProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error) {
        console.error('Error fetching collection products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
      <Box sx={{ paddingTop: '100px', paddingBottom: '100px' }}>
        {products.length > 0 ? (
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
                  height: 'auto'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    flex: '1'
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      maxWidth: '100%',
                      width: '100%',
                      height: 'auto',
                      position: 'absolute',
                      bottom: '0',
                      left: '0'
                    }}
                    alt={product.title}
                    src={product.featuredImage?.url}
                    loading="lazy"
                  />
                </Box>
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
                    <Typography
                      component="p"
                      className="text-slate-600"
                      sx={{ textAlign: 'justify' }}
                    >
                      <TextTruncate
                        line={9}
                        element="span"
                        truncateText="…"
                        text={product.description}
                        textTruncateChild={
                          <Typography
                            component="a"
                            href={`/product/${product.handle}`}
                            sx={{
                              display: 'block',
                              textAlign: 'right',
                              fontSize: '16px',
                              textTransform: 'uppercase',
                              paddingTop: '50px',
                              color: 'primary.main'
                            }}
                          >
                            Zum Produkt
                          </Typography>
                        }
                      />
                    </Typography>
                  </div>
                </Box>
              </Box>
            ))}
          </Slide>
        ) : (
          <div>No products available</div>
        )}
      </Box>
    </Container>
  );
};

export default CollectionProducts;
