import { NextResponse } from 'next/server';

const JUDGEME_API_URL = 'https://judge.me/api/v1/reviews';
const SHOP_DOMAIN = 'bexolutionsteststore.myshopify.com';
const API_TOKEN = 'LOL0WxeJ2wUrj8__zgtlTDiDIaM';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const handle = params.id;

  if (!handle) {
    return NextResponse.json({ error: 'External ID is required' }, { status: 400 });
  }

  try {
    // Fetch the data from Judge.me API
    const res = await fetch(
      `${JUDGEME_API_URL}?shop_domain=${SHOP_DOMAIN}&api_token=${API_TOKEN}&per_page=1000`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }

    const data = await res.json();




// Filter and sort reviews
const filteredAndSortedReviews = data.reviews.filter((review: { product_handle: string; }) => review.product_handle === handle) 


const totalRatings = filteredAndSortedReviews.reduce((sum: any, review: { rating: any; }) => sum + review.rating, 0);
const reviewCount = filteredAndSortedReviews.length;
const averageRating = reviewCount > 0 ? (totalRatings / reviewCount).toFixed(2) : 0; // Keep 2 decimal places


console.log(totalRatings);
console.log(reviewCount);
console.log(averageRating);


    





    return NextResponse.json({
      reviews: filteredAndSortedReviews,
      reviewCount: Number(reviewCount),
      averageRating: Number(averageRating)
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
