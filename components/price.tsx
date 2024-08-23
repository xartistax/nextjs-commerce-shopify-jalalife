import { Typography } from '@mui/material';
import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'CHF',
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <Typography
    suppressHydrationWarning={true}
    variant="button"
    fontSize={'2rem'}
    className={className}
  >
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))}`}
    <span className={clsx('ml-1 inline', currencyCodeClassName)}></span>
  </Typography>
);

export default Price;
