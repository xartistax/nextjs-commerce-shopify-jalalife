import { Product } from 'lib/shopify/types';
import { v4 as uuidv4 } from 'uuid';
import Stars from './stars';





  interface Props {
    handle: string;
    product: Product
    align: string
  }


  function calculateAverageRating(reviews: any[]) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
  
    // Round to the nearest 0.5
    const roundedRating = Math.round(averageRating * 2) / 2;
  
    return roundedRating;
  }
  

  export default async function ReviewStarsServer({ handle, product, align }: Props) {

    const response = await fetch(`http://localhost:3000/api/reviews/single/${handle}`);

    if (!response.ok) {
        // Handle errors if the fetch fails
        console.error("Failed to fetch reviews:", response.statusText);
        return ;
      }


      const data = await response.json();

      const filteredReviews = data.reviews.filter(
        (review: any) => !review.hidden && review.published
      );





      const total = filteredReviews.length
      const rating = calculateAverageRating(filteredReviews)
      


    return <Stars key={uuidv4()} rating={rating} total={total} reviews={filteredReviews} product={product} align={align}  />
}



