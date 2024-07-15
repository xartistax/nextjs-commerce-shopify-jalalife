import { getCollectionProducts } from 'lib/shopify'; // Import the function to fetch collection products
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const collectionHandle = 'hidden-carousel'; // Specify the handle of the collection you want to fetch products from

    // Fetch products from the specified collection
    const products = await getCollectionProducts({ collection: collectionHandle });

    // Respond with the fetched products
    return new NextResponse(JSON.stringify(products), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching collection products:', error);
    // Handle error response
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch collection products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
