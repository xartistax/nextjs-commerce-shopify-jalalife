import { Box, Divider, Typography } from '@mui/material'; // Ensure you have @mui/material installed
import TimeAgo from 'javascript-time-ago';
import de from 'javascript-time-ago/locale/de';
import { Review } from './ReviewStars/stars';

interface RevieCardProps  {
    review: Review,
    isLast: boolean
}

TimeAgo.addLocale(de);
  const timeAgo = new TimeAgo('de-DE');

const ReviewCard = ({ review, isLast } : RevieCardProps) => {
  return (
    <Box marginBottom={isLast ? 0 : 4}>
      <Typography variant="h6" component="h2">
        {review.title}
      </Typography>
      <Typography component="p">
        {review.body}
      </Typography>
      <Typography component="p" fontSize="small" sx={{ marginTop: '20px', color:'primary.main', fontWeight: 'bold' }}>
      <span> {timeAgo.format(new Date(review.created_at))} </span>
        {" | "}
        {review.reviewer.name}
      </Typography>
      <Divider sx={{ marginTop: '20px' }} />
    </Box>
  );
};

export default ReviewCard;
