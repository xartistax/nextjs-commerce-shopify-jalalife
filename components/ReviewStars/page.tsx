import { Product } from 'lib/shopify/types';
import Stars from './stars';





  interface Props {
    handle: string;
    product: Product
    i: string;
    align: string
  }


  

  function calculateAverageRating(reviews: any[]) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    
    // Round to the nearest 0.5
    const roundedRating = Math.round(averageRating * 2) / 2;
  
    return roundedRating;
  }
  

  export default async function ReviewStarsServer({ handle, product, i, align }: Props) {

    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
  

    const response = await fetch(`${baseUrl}/api/reviews/single/${handle}`, {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    }
    );

    if (!response.ok) {
        // Handle errors if the fetch fails
        console.error("Server Component: Failed to fetch reviews:", response.statusText, response.status);
        return ;
      }


      const data = await response.json();

      const filteredReviews = data.reviews.filter(
        (review: any) => !review.hidden && review.published
      );

 




      const total = filteredReviews.length
      const rating = calculateAverageRating(filteredReviews)
      


    return <Stars key={i} rating={rating} total={total} reviews={filteredReviews} product={product} i={i} align={align}  />
}



