import { Box, Link, Typography } from '@mui/material';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';

import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <Box className="productBox" sx={{ py: { xs: '30px', md: '100px' } }}>
        <Box className="mb-6 flex flex-col pb-6">
          <Typography gutterBottom variant="h1" fontSize={'3.75rem'} fontWeight={900}>
            {product.title}
          </Typography>
          <Box
            component="div"
            className="mr-auto w-auto py-2 text-sm text-white"
            sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </Box>
          <Box component="div" className="mr-auto w-auto py-2 text-sm font-light ">
            <Typography variant="caption" fontWeight={'light'}>
              Versand: 1 - 2 Tage <br />
              inkl. MwSt., exkl.{' '}
              <Link href={'/pages/versandbedingungen'} sx={{ textDecoration: 'underline' }}>
                {' '}
                Versandkosten{' '}
              </Link>
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
