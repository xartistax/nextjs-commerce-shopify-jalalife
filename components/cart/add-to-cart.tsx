'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, Button, Typography } from '@mui/material';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative w-full max-w-xs flex items-center justify-center rounded-full bg-customColor p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return <Button className={clsx(buttonClasses, disabledClasses)}>Zurzeit nicht an Lager</Button>;
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <Box
          component={'div'}
          className="absolute left-0 ml-4"
          sx={{ display: { md: 'block', xs: 'none' } }}
        >
          <PlusIcon className="h-5" />
        </Box>
        <Typography variant="button" fontSize={'1rem'}>
          In den Warenkorb
        </Typography>
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="In den Warenkorb"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        [disabledClasses]: pending
      })}
    >
      <Box
        component={'div'}
        className="absolute left-0 ml-4"
        sx={{ display: { md: 'block', xs: 'none' }, lineHeight: { md: 'inherit', xs: '1rem' } }}
      >
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </Box>
      <Typography variant="button" sx={{ fontSize: { md: '0.9rem', xs: '0.63rem' } }}>
        In den Warenkorb
      </Typography>
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  align,
  hasNoOptionsOrJustOneOption,
  handle,
  origin
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  align: string;
  hasNoOptionsOrJustOneOption: boolean;
  handle: string,
  origin: string | null
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <Box
      component={'form'}
      action={actionWithVariant}
      sx={{
        width: '100%',
        margin: 'auto',
        display: 'flex',
        justifyContent: align,
        alignItems: align, // Center content vertically
        textAlign: align
      }}
    >

    

        <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
          <Typography component={'p'} aria-live="polite" className="sr-only" role="status">
            {message}
          </Typography>
        
    




    </Box>
  );
}
