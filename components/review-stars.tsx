'use client';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, CircularProgress, IconButton, Popper, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// Define props for the ReviewStars component
interface ReviewStarsProps {
  handle: string; // The ID of the product for which we fetch the reviews
  align?: 'left' | 'center'; // Alignment option for the stars (default is 'center')
}

// Render stars with rating and total reviews
const renderStars = (rating: number, total: number, onClick: (event: React.MouseEvent) => void, align: 'left' | 'center' = 'center') => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <Box sx={{ display: 'flex', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <IconButton onClick={onClick} style={{ padding: 0 }}>
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} fontSize="small" color="primary" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <StarBorderIcon key={`empty-${i}`} fontSize="small" color="primary" />
        ))}
      </IconButton>
      <Tooltip title={`Based on ${total} reviews`} arrow>
        <Typography variant="caption" gutterBottom>
          {`(${rating})`}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default function ReviewStars({ handle, align = 'center' }: ReviewStarsProps) {
  const [starCount, setStarCount] = useState<number>(0); // State to hold the fetched star count
  const [total, setTotal] = useState<number>(0); // Total reviews
  const [reviews, setReviews] = useState<any[]>([]); // Reviews array
  const [loading, setLoading] = useState<boolean>(false); // Loading state for reviews
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Popper anchor
  const [activeHandle, setActiveHandle] = useState<string | null>(null); // Track active handle for Popper

  useEffect(() => {
    async function fetchProductReview() {
      try {
        const res = await fetch(`/api/reviews/single/${handle}`); // Fetch review data
        const data = await res.json();

        setStarCount(data.averageRating || 0); // Update average rating
        setTotal(data.reviewCount || 0); // Update total reviews
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setStarCount(0); // Fallback
        setTotal(0); // Fallback
      }
    }

    fetchProductReview(); // Fetch reviews on mount
  }, [handle]);

  useEffect(() => {
    console.log('BODY: ', reviews);
  }, [reviews]);

  const handleStarClick = async (event: React.MouseEvent) => {
    const target = event.currentTarget;

    // Toggle the popup for the current handle
    if (activeHandle === handle) {
      setAnchorEl(null);
      setActiveHandle(null);
      return;
    }

    setAnchorEl(target as HTMLElement);
    setActiveHandle(handle);
    setLoading(true); // Show loading spinner

    try {
      const res = await fetch(`/api/reviews/single/${handle}`); // Fetch review data
      const data = await res.json();

      console.log('Fetched Data:', data);

      // Filter reviews based on the product handle
      const filteredReviews = data.reviews.filter(
        (review: any) => review.product_handle === handle && !review.title.includes('API')
      );

      setReviews(filteredReviews); // Update reviews state with filtered reviews
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]); // Fallback in case of error
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const open = activeHandle === handle && Boolean(anchorEl); // Open only if activeHandle matches
  const id = open ? 'review-popper' : undefined;

  return (
    <>
      {renderStars(starCount, total, handleStarClick, align)}

      {/* Popper to show detailed reviews */}
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <Box
          sx={{
            width: 300,
            maxHeight: 400,
            overflowY: 'auto',
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Erfahrungen
          </Typography>

          {loading ? (
            <CircularProgress size={24} />
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {review.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {review.body}
                </Typography>
                <Typography variant="caption" fontWeight={'bold'} color="primary.main">
                  Bewertung: {review.rating}/5
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No reviews available.
            </Typography>
          )}
        </Box>
      </Popper>
    </>
  );
}
