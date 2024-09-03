'use client';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  Box,
  BoxProps,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Tooltip,
  Typography
} from '@mui/material';
import TimeAgo from 'javascript-time-ago';
import de from 'javascript-time-ago/locale/de';
import { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import TextTruncate from 'react-text-truncate';
import styled from 'styled-components';
// Define the type for a reviewer
interface Reviewer {
  id: number;
  external_id: string | null;
  email: string;
  name: string;
  phone: string | null;
  accepts_marketing: boolean;
  unsubscribed_at: string | null;
  tags: string | null;
}

// Define the type for a single review
interface Review {
  id: number;
  title: string;
  body: string;
  rating: number;
  product_external_id: number;
  reviewer: Reviewer;
  source: string;
  curated: string;
  published: boolean;
  hidden: boolean;
  verified: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  has_published_pictures: boolean;
  has_published_videos: boolean;
  pictures: any[]; // Assuming pictures is an array of unknown objects
  ip_address: string | null;
  product_title: string;
  product_handle: string;
}

interface PlaceholderProps extends BoxProps {
  fadeOut?: boolean;
}

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

const SectionReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderReady, setSliderReady] = useState(false);
  const [placeholderFadeOut, setPlaceholderFadeOut] = useState(false);

  TimeAgo.addDefaultLocale(de);
  const timeAgo = new TimeAgo('de-DE');

  const responsiveSettings = [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews', { cache: 'no-cache' });
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setReviews(data.reviews);
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

    fetchReviews();
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
        sx={{ paddingTop: { xs: '30px', md: '200px' }, paddingBottom: { xs: '30px', md: '100px' } }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '300px', // Ensure the container has the same height as slides
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
              {reviews.map((review, index) => (
                <Paper
                  key={index}
                  className="each-slide"
                  sx={{
                    textAlign: 'left',
                    minHeight: '300px',
                    height: 'auto',
                    alignItems: 'stretch',
                    padding: 6,
                    position: 'relative'
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Typography
                      variant="h5"
                      component={'h2'}
                      fontWeight={900}
                      lineHeight={1}
                      gutterBottom
                    >
                      <TextTruncate line={1} element="div" truncateText="…" text={review.title} />
                    </Typography>

                    {review.verified && (
                      <Tooltip title="Verifiezierter kauf" arrow>
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            color: 'gray',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.1)',
                              color: 'primary.main'
                            },
                            '& .MuiSvgIcon-root': {
                              fontSize: '1.2rem' // Smaller size for the icon
                            }
                          }}
                        >
                          <VerifiedUserIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    {Array.from({ length: 5 }, (_, i) =>
                      i < review.rating ? (
                        <StarIcon key={i} sx={{ color: 'primary.main' }} />
                      ) : (
                        <StarBorderIcon key={i} sx={{ color: 'primary.main' }} />
                      )
                    )}
                  </Box>

                  <Typography variant="body1" gutterBottom>
                    <TextTruncate line={2} element="div" truncateText="…" text={review.body} />
                  </Typography>

                  <Link href={`/product/${review.product_handle}`}>
                    <Typography variant="body1" fontWeight={600} gutterBottom marginTop={3}>
                      {' '}
                      {review.product_title}{' '}
                    </Typography>
                  </Link>

                  <Box
                    sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', px: 6, py: 2 }}
                  >
                    <Grid container>
                      <Grid item sm={6}>
                        {' '}
                        <Typography variant="caption">{review.reviewer.name}</Typography>{' '}
                      </Grid>
                      <Grid item sm={6} textAlign={'right'}>
                        {' '}
                        <Typography variant="caption">
                          {' '}
                          {timeAgo.format(new Date(review.created_at))}{' '}
                        </Typography>{' '}
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              ))}
            </Slide>
          </SlideContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default SectionReviews;
