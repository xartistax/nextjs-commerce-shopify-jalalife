import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'CHF',
  comparedPriceAmount,
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  comparedPriceAmount: string | null; // Allow null
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {
  const originalPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(parseFloat(amount));

  const comparedPrice = comparedPriceAmount
    ? new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(parseFloat(comparedPriceAmount))
    : null;

  const hasDiscount = comparedPriceAmount && parseFloat(comparedPriceAmount) > parseFloat(amount);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={'center'}
      width={'100%'}
      textAlign={'center'}
    >
      {hasDiscount && comparedPrice && (
        <Typography
          suppressHydrationWarning={true}
          variant="button"
          fontSize={'2rem'}
          className={clsx(className)}
          sx={{
            fontSize: { md: '1.0rem', xs: '1.25rem' },
            fontWeight: 'bold',
            textDecoration: 'line-through',
            mr: 2, // Margin to the right
            color: '#53706B'
          }}
        >
          {comparedPrice}
        </Typography>
      )}

      <Typography
        suppressHydrationWarning={true}
        variant="button"
        fontSize={'2rem'}
        className={clsx(className)}
        sx={{
          fontSize: { md: '1.75rem', xs: '1.25rem' },
          fontWeight: 'bold',
          color: hasDiscount ? 'primary.main' : 'inherit' // Highlighted if discounted
        }}
      >
        {originalPrice}
      </Typography>
    </Box>
  );
};

export default Price;
