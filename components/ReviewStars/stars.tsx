import CustomPopover from 'components/custom-popover';
import { Product } from 'lib/shopify/types';


interface Reviewer {
  id: number;
  external_id: string | null;
  email: string;
  name: string;
  phone: string | null;
  accepts_marketing: boolean;
  unsubscribed_at: string | null;
  tags: string | null;
}

export type Review = {
  id: number;
  title: string;
  body: string;
  rating: number;
  product_external_id: number;
  reviewer: Reviewer;
  source: string;
  curated: string;
  published: boolean;
  hidden: boolean;
  verified: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  has_published_pictures: boolean;
  has_published_videos: boolean;
  pictures: any[]; // Assuming pictures is an array of unknown objects
  ip_address: string | null;
  product_title: string;
  product_handle: string;
};

export interface ReviewStarsProps {
  rating: number;
  total: number; 
  reviews: Review[]
  product: Product
  align: String
  i?: string;
}







export default function Stars({ rating = 0, total = 0, reviews = [], product, align }: ReviewStarsProps) {
  return (
    <CustomPopover
      key={product.id || 'default-popover'} // Ensure a unique key for the product or fallback
      rating={rating}
      total={total}
      reviews={reviews}
      product={product}
      align={align}
    />
  );
}





