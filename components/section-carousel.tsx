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
  // Add other properties as needed
}

const CollectionProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const responsiveSettings = [
    {
      breakpoint: 768, // Tailwind's sm breakpoint (640px)
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching collection products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative', // Ensure relative positioning for proper layering
        textAlign: 'center',
        overflow: 'hidden' // Prevent overflow issues
      }}
    >
      <Box sx={{ paddingTop: '100px', paddingBottom: '100px' }}>
        {products.length > 0 ? (
          <Slide
            duration={50000}
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
                  minHeight: '400px', // Make the container 100% height
                  height: 'auto'
                }}
              >
                {/* Left box with green background */}
                <Box
                  sx={{
                    position: 'relative',
                    flex: '1' // Take up half of the available width
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
                    alt="Indischer Weihrauch mit Zink"
                    src={product.featuredImage?.url}
                  />
                </Box>

                {/* Right box with blue background and product title */}
                <Box
                  sx={{
                    flex: '1', // Take up the other half of the available width
                    display: 'flex',
                    alignItems: 'center', // Center content vertically
                    justifyContent: 'center', // Center content horizontally
                    paddingLeft: '16px' // Add padding for better spacing
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
                            {' '}
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
          <div>Loading...</div>
        )}
      </Box>
    </Container>
  );
};

export default CollectionProducts;
