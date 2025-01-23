'use client';
import { Box, Container, Typography } from '@mui/material';
import Slider from 'react-slick';
import TextTruncate from 'react-text-truncate';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CustomPopoverHome from './custom-popover-reviews-home';
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

interface Props {
  reviews: Review[];
}

export default function SectionReviews({ reviews }: Props) {


   

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: false,
  };


  const slideSettings = {
    margin: '10px',
    padding: '10%',





              border: '1px solid #ddd',
              borderRadius: '8px',

              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '20px', // Added space between each review
  };

  return (
    <Container
      maxWidth="lg"
      className='slider-container'
      sx={{
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        py: '50px'
      }}
    >
      <Slider {...settings}>
        {Array.isArray(reviews) && reviews.map((review, index) => (
 
          <Box 
            key={`review-carousel-${index}`} 
            
          >

            <Box sx={slideSettings}>
            {/* Review Title */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              <TextTruncate line={1} element="span" truncateText="…" text={review.title} />
            </Typography>

            {/* Review Body */}
            <Typography variant="body2" sx={{ marginBottom: '15px' }}>
       
                <TextTruncate line={3} element="span" truncateText="…" text={review.body} />
            </Typography>

            {/* Rating */}

            
         
            <CustomPopoverHome
                rating={review.rating}
                reviews={reviews.filter((r) => r.product_external_id === review.product_external_id)}
            />

            {/* Reviewer Name */}
            <Typography variant="caption" color="textSecondary">
              - {review.reviewer.name}
            </Typography>

            </Box>

          </Box>
        ))}
      </Slider>
    </Container>
  );

}
