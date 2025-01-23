import ReviewCarousel from "./review-carousel";

export default async function SectionReviews () {

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


  const filteredReviews = data.reviews.filter((review: any) => {
   
    return !review.hidden && review.published;
  });


 


 
 


  


  return <ReviewCarousel reviews={filteredReviews}  />
}