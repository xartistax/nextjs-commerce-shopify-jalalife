import CustomPopover from 'components/custom-popover';
import { Product } from 'lib/shopify/types';


type Review = {
  id:string
  title: string;
  body: string;
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





