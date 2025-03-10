import { Box, Link, Typography } from '@mui/material';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import ReviewStarsServer from 'components/ReviewStars/page';
// import SubifyWidget from 'components/subi';
import SubifyWidget from 'components/subi';
import { getProductById } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { VariantSelector } from './variant-selector';





export async function ProductDescription({
  product,
  searchParams
}: {
  product: Product;
  searchParams: { [key: string]: string | undefined };
}) {


  
  let associatedProductIds = product.metafields[3]?.value || null;
  const hasNoOptionsOrJustOneOption =
    ! product.options.length || (product.options.length === 1 && product.options[0]?.values.length === 1);

  if (associatedProductIds) {
    try {
      associatedProductIds = JSON.parse(associatedProductIds);
    } catch (error) {
      console.error('Error parsing associatedProductIds', error);
    }
  }

  // Fetch associated products by ID if it's a valid array
  let associatedProducts: Product[] = [];
  if (Array.isArray(associatedProductIds) && associatedProductIds.length > 0) {
    associatedProducts = await Promise.all(
      associatedProductIds.map(async (productId: string): Promise<Product> => {
        return (await getProductById(productId)) as Product; // Assume getProductById returns Product type
      })
    );
  }

  return (
    <>
      <Box className="productBox" sx={{ py: { xs: '30px', md: '100px' } }}>
        <Box className="mb-6 flex flex-col pb-6">
          <Typography gutterBottom variant="h1" fontSize={'3.75rem'} fontWeight={900}>
            {product.title}
            <Box component={'small'} sx={{ fontSize: '1rem', display: 'block' }}>
              {product.metafields[0]?.value ? (
                <>{product.metafields[0]?.value}</>
              ) : (
                <>
                  <Typography variant="body2" fontWeight={'bold'}>
                    {associatedProducts.map((product: Product, idx: number) => (
                      <span key={idx}>
                        <Link href={`/products/${product.handle}`}>{product.title}</Link>
                        {/* Only add ' || ' if it's not the last product */}
                        {idx < associatedProducts.length - 1 && ' || '}
                      </span>
                    ))}
                  </Typography>
                </>
              )}
            </Box>
          </Typography>

           <ReviewStarsServer handle={product.handle} product={product} align="left" i={uuidv4()} />  

          <Box
            component="div"
            className="mr-auto w-auto py-2 text-sm text-white"
            sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.5rem' }}
          >

            {
              hasNoOptionsOrJustOneOption ? (

                <Price
                minPrice ={product.priceRange.minVariantPrice.amount}
              amount={product.priceRange.maxVariantPrice.amount}
              comparedPriceAmount={product.compareAtPriceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              align="start"
              hasNoOptionsOrJustOneOption={hasNoOptionsOrJustOneOption}
            />

              ) : (
                      <> 


                      <Price
                      minPrice ={product.priceRange.minVariantPrice.amount}
              amount={
                searchParams.denominations
                  ? String(parseInt(searchParams.denominations.replace(/[^\d]/g, ''), 10) / 100)
                  : product.priceRange.maxVariantPrice.amount
              }
              comparedPriceAmount={product.compareAtPriceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              align="start"
              hasNoOptionsOrJustOneOption={true}
            />
                      
                      
                       </>
              )
            }
            


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



        <SubifyWidget productHandle={product.handle}  />

        <Suspense fallback={null}>
          <AddToCart
            variants={product.variants}
            availableForSale={product.availableForSale}
            align="center"
            hasNoOptionsOrJustOneOption={hasNoOptionsOrJustOneOption}
            handle={product.handle}
            origin={"inProduct"}
          />
        </Suspense>


      </Box>
    </>
  );
}
