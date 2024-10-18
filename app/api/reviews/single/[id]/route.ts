import { parseHTML } from 'linkedom';
import { NextResponse } from 'next/server';

const JUDGEME_API_URL = 'https://judge.me/api/v1/widgets/product_review';
const SHOP_DOMAIN = 'bexolutionsteststore.myshopify.com';
const API_TOKEN = 'LOL0WxeJ2wUrj8__zgtlTDiDIaM';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const externalId = params.id;

  if (!externalId) {
    return NextResponse.json({ error: 'External ID is required' }, { status: 400 });
  }

  try {
    // Fetch the data from Judge.me API
    const res = await fetch(
      `${JUDGEME_API_URL}?shop_domain=${SHOP_DOMAIN}&api_token=${API_TOKEN}&external_id=${externalId}`,
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

    // Extract the widget HTML
    const widgetHTML = data.widget;

    // Parse the HTML and extract review count and average rating
    const { document } = parseHTML(widgetHTML);
    const averageRating =
      document.querySelector('.jdgm-rev-widg')?.getAttribute('data-average-rating') || '0';
    const reviewCount =
      document.querySelector('.jdgm-rev-widg')?.getAttribute('data-number-of-reviews') || '0';

    return NextResponse.json({
      reviewCount: Number(reviewCount),
      averageRating: Number(averageRating)
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
