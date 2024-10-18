'use client';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Define props for the ReviewStars component
interface ReviewStarsProps {
  starCount: number; // starCount is passed as a prop
}

export const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} fontSize="small" color="primary" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarBorderIcon key={i} fontSize="small" color="primary" />
      ))}
    </>
  );
};

export default function ReviewStars({ starCount }: ReviewStarsProps) {
  return renderStars(starCount);
}
