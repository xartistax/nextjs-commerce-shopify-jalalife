"use client"


import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Box, Link, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Review } from './ReviewStars/stars';
import ReviewCard from './review-card';


export interface ReviewStarsHomeProps {
  rating: number;
  reviews: Review[]
  
}


export function renderStars(rating: number) {
  // Ensure rating is a valid number
  if (isNaN(rating) || rating < 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
        {Array(5).fill(null).map((_, index) => (
          <StarBorderIcon key={`empty-${index}`} color="primary" />
        ))}
       
      </Box>
    );
  }

  // Number of full, half, and empty stars
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = Math.max(0, 5 - fullStars - halfStar);

  // Generate star icons with unique keys
  const stars = [
    ...Array(fullStars).fill(null).map((_, index) => (
      <StarIcon key={`full-${index}`} color="primary" />
    )),
    ...Array(halfStar).fill(null).map((_, index) => (
      <StarHalfIcon key={`half-${index}`} color="primary" />
    )),
    ...Array(emptyStars).fill(null).map((_, index) => (
      <StarBorderIcon key={`empty-${index}`} color="primary" />
    )),
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
      {stars} {/* Render all stars */}
    </Box>
  );
}


export default function CustomPopoverHome({ rating, reviews }: ReviewStarsHomeProps) {


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Proper type for anchorEl
  const [showPopOver, setShowPopOver] = useState(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '50%' },
    maxwidth: { xs: '90%', sm: '50%' },
    minHeight: 300,
    maxHeight: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
    marginBottom: 200,
    display: 'block'
  };

  // Function to open the popover
  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine if popover is open
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (rating > 0) {
      setShowPopOver(true);
    }
  }, [rating]); // Only depend on rating, showPopOver does not need to be here



  return (
    <>
      {showPopOver ? (
        <Link
        key={ `popOverButton-${uuidv4()}` }
        onClick={handleClick}
        component="span"
        
      >
        {renderStars(rating)}
      </Link>
      
      ) : (
        renderStars(rating)
      )}


<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    {reviews && reviews.length > 0 ? (
      <>
        {/* Link to the product */}
        <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={3}
            >
              <Typography
                variant="h4"
                component="h2"
                fontWeight={900}
              >
                {reviews[0]?.product_title}
              </Typography>

              {/* Link to the product */}
              <Typography>
              <Link
                href={`/products/${reviews[0]?.product_handle}`} // Dynamically link to the product handle
                target="_blank"
                rel="noopener"
                sx={{ marginLeft: 2, fontSize: '16px' }}
              >
                zum Produkt
              </Link>
              </Typography>
              
            </Box>

        {reviews.map((review, index) => (
          <Box key={review.id} marginBottom={index === reviews.length - 1 ? 0 : 4}>
            <ReviewCard review={review} isLast={index === reviews.length - 1} />
          </Box>
        ))}
      </>
    ) : null}
  </Box>
</Modal>




      
        

     
    </>
  );
}
