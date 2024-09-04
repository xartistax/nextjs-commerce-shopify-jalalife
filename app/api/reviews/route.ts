import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    // Fetch reviews from the specified collection
    const response = await fetch(
      `https://judge.me/api/v1/reviews?shop_domain=jala-life-redesign.myshopify.com&api_token=VQh2nF-C11LTu-G5MEc5p_nFoH8`
    );

    // Parse the response to JSON
    const reviews = await response.json();

    // Respond with the fetched reviews
    return new NextResponse(JSON.stringify(reviews), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Handle error response
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch reviews' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
