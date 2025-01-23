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

    const JUDGEME_API_URL = 'https://judge.me/api/v1/reviews';
    const SHOP_DOMAIN = 'bexolutionsteststore.myshopify.com';
    const API_TOKEN = 'LOL0WxeJ2wUrj8__zgtlTDiDIaM';
  

    const response = await fetch(`${JUDGEME_API_URL}?shop_domain=${SHOP_DOMAIN}&api_token=${API_TOKEN}&per_page=1000`, {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    }
    );

    if (!response.ok) {
        // Handle errors if the fetch fails
        console.error("Server Component: Failed to fetch reviews:", response.statusText, response.status);
        return ;
      }


      const data = await response.json();


      const filteredReviews = data.reviews.filter((review: { product_handle: string; hidden: boolean; published: boolean }) => 
        review.product_handle === handle && !review.hidden && review.published
      );

 




      const total = filteredReviews.length
      const rating = calculateAverageRating(filteredReviews)
      


    return <Stars key={i} rating={rating} total={total} reviews={filteredReviews} product={product} i={i} align={align}  />
}



