import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

const Price = ({
  amount,
  comparedAmount,
  className,
  currencyCode = 'CHF',
  currencyCodeClassName
}: {
  amount: string;
  comparedAmount?: string; // Update to optional
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {
  const originalPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(parseFloat(amount));

  const comparedPrice = comparedAmount
    ? new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(parseFloat(comparedAmount))
    : null; // Do not format comparedAmount if it is null or undefined

  // Adjust discount logic to check if comparedAmount exists and is greater than amount
  const hasDiscount = comparedAmount && parseFloat(comparedAmount) > parseFloat(amount);

  return (
    <Box
      display="flex"
      alignItems={'start'}
      justifyContent={'start'}
      width={'100%'}
      textAlign={'left'}
    >
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
        {originalPrice}
      </Typography>
    </Box>
  );
};

export default Price;
