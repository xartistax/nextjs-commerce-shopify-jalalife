import { Box, Typography } from '@mui/material';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <Box>
        <Box className="mb-6 flex flex-col pb-6">
          <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
          <Box
            component="div"
            className="mr-auto w-auto p-2 text-sm text-white"
            sx={{ backgroundColor: 'primary.main' }}
          >
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </Box>
          <Box component="div" className="mr-auto w-auto py-2 text-sm  text-slate-800">
            <Typography variant="caption">
              Versand: 1 - 2 Tage <br />
              inkl. MwSt., exkl. <Link href={'/versandbedingungen'}> Versandkosten </Link>
            </Typography>
          </Box>
        </Box>
        <Suspense fallback={null}>
          <VariantSelector options={product.options} variants={product.variants} />
        </Suspense>

        {product.descriptionHtml ? (
          <Prose className="mb-6 leading-tight" html={product.descriptionHtml} />
        ) : null}

        <Suspense fallback={null}>
          <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
        </Suspense>
      </Box>
    </>
  );
}
