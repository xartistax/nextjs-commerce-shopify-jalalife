import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

const Price = ({
  minPrice,
  amount,
  comparedPriceAmount,
  align,
  className,
  currencyCode = 'CHF',
  currencyCodeClassName,
  hasNoOptionsOrJustOneOption 
  
}: {
  minPrice: string;
  amount: string;
  comparedPriceAmount?: string; // Update to optional
  align: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  hasNoOptionsOrJustOneOption: boolean 
} & React.ComponentProps<'p'>) => {
  const originalPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(parseFloat(minPrice));


  const comparedPrice = comparedPriceAmount
    ? new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(parseFloat(comparedPriceAmount))
    : null; // Do not format comparedPriceAmount if it is null or undefined

  // Adjust discount logic to check if comparedPriceAmount exists and is greater than amount
  const hasDiscount = comparedPriceAmount && parseFloat(comparedPriceAmount) > parseFloat(amount);

  return (
    <Box display="flex" alignItems={'start'} justifyContent={align} width={'100%'}>
      {hasDiscount && comparedPrice && (
        <>
          <Typography
            suppressHydrationWarning={true}
            variant="button"
            fontSize={'2rem'}
            className={clsx(className)}
            sx={{
              fontSize: { md: '1.0rem', xs: '1.25rem' },
              fontWeight: 'bold',
              textDecoration: 'line-through',
              mr: 2,
              color: '#53706B'
            }}
          >
            {comparedPrice}
          </Typography>
        </>
      )}

      <Typography
        suppressHydrationWarning={true}
        variant="button"
        fontSize={'2rem'}
        className={clsx(className)}
        sx={{
          fontSize: { md: '1.75rem', xs: '1.25rem' },
          fontWeight: 'bold',
          color: hasDiscount ? 'primary.main' : 'inherit'
        }}
      >
        {
          hasNoOptionsOrJustOneOption ? null :  <Box component={"span"} textTransform={"lowercase"} fontSize={".9rem"}> ab </Box> 
        }
       
        
        {originalPrice} 
      </Typography>
    </Box>
  );
};

export default Price;
