'use client';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// Define props for the ReviewStars component
interface ReviewStarsProps {
  product_id: string; // The ID of the product for which we fetch the reviews
}

const renderStars = (rating: number, total: number) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} fontSize="small" color="primary" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarBorderIcon key={`empty-${i}`} fontSize="small" color="primary" />
      ))}

      <Tooltip title={`Basierend auf ${total} Bewertungen`} arrow>
        <Typography variant="caption" gutterBottom>
          {`(${rating})`}
        </Typography>
      </Tooltip>
    </>
  );
};

export default function ReviewStars({ product_id }: ReviewStarsProps) {
  const [starCount, setStarCount] = useState<number>(0); // State to hold the fetched star count
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    async function fetchProductReview() {
      try {
        const res = await fetch(`/api/reviews/single/${product_id}`); // Fetch review data
        const data = await res.json();
        setStarCount(data.averageRating || 0); // Update state with fetched average rating
        setTotal(data.reviewCount || 0);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setStarCount(0); // Fallback in case of error
      }
    }

    fetchProductReview(); // Call the function to fetch reviews
  }, [product_id]); // Effect runs when product_id changes

  return renderStars(starCount, total); // Render stars based on the fetched rating
}
