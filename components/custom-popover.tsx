"use client"


import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Box, Link, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReviewStarsProps } from './ReviewStars/stars';





export function renderStars(rating: number, total: number, align: string) {
  // Ensure rating is a valid number
  if (isNaN(rating) || rating < 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: align, alignItems: 'center', width: '100%' }}>
        {Array(5).fill(null).map((_, index) => (
          <StarBorderIcon key={`empty-${index}`} color="primary" />
        ))}
        <span style={{ marginLeft: '8px' }}>({total})</span>
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
    <Box sx={{ display: 'flex', justifyContent: align, alignItems: 'center', width: '100%' }}>
      {stars} {/* Render all stars */}
      <span style={{ marginLeft: '8px' }}>({total})</span> {/* Show the total reviews */}
    </Box>
  );
}


export default function CustomPopover({ rating, total, reviews, product, align }: ReviewStarsProps) {

  console.log(reviews[0]?.id)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Proper type for anchorEl
  const [showPopOver, setShowPopOver] = useState(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxwidth: '50%',
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
        {renderStars(rating, total, String(align))}
      </Link>
      
      ) : (
        renderStars(rating, total, String(align))
      )}


<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box  sx={style}>


{
    product && product.title ? (
        <Typography variant='h4' component={'h2'} fontWeight={900} marginBottom={3}> {product.title} </Typography>
    ) : (null) 
}

  {
    reviews && reviews.length > 0 ? ( 

        
      reviews.map((review, index) => (
        
        <Box key={ `${ review.id }` } marginBottom={ index === reviews.length - 1 ? 0 : 4 }>

            <Typography variant='h6' component={'h2'}> {review.title} </Typography>
            <Typography component={'p'}> {review.body} </Typography>

            
          
        </Box>
      ))
    ) : null
  }
</Box>
</Modal>

      
        

     
    </>
  );
}
