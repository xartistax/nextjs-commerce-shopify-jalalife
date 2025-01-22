import CustomPopover from 'components/custom-popover';
import { Product } from 'lib/shopify/types';
import { v4 as uuidv4 } from 'uuid';


type Review = {
  title: string;
  body: string;
};

export interface ReviewStarsProps {
  rating: number;
  total: number; 
  reviews: Review[]
  product: Product
  align: String
}







export default function Stars({ rating = 0, total = 0, reviews = [], product , align}: ReviewStarsProps) {



  return (


    <CustomPopover key={uuidv4()} rating={rating} total={total} reviews={reviews} product={product} align={align} />


    
  );
}




