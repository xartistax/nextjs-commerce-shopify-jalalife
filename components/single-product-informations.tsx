// Assuming Prose is a component to render HTML

import InfoIcon from '@mui/icons-material/Info';
import { Grid, Stack, Typography } from '@mui/material';
import { getProductMetafields } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { identifiers } from 'lib/utils';
import { toHTML } from 'utils/json-to-html';
import Prose from './prose';
import InformationNavigation from './single-product-info-navigation';

export async function SingleProductInformations({ product }: { product: Product }) {
  const handle = product.handle;

  const metafields = await getProductMetafields(handle, identifiers);
  console.log(metafields);

  return metafields && metafields.length > 0 ? (
    <>
      <InformationNavigation />
      {metafields.map(({ metafield, fullName }) => (
        <section
          id={metafield.key}
          className="info-section mx-auto w-full max-w-screen-xl py-4 "
          key={metafield.key}
        >
          <Grid container spacing={2} alignItems="top">
            <Grid item xs={12} md={4}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <InfoIcon />
                <Typography
                  gutterBottom
                  component="h2"
                  variant="h4"
                  sx={{ fontWeight: { xs: 'bold', md: 'normal' } }}
                >
                  {fullName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Prose className="leading-tight" html={toHTML(metafield.value)} />
            </Grid>
          </Grid>
        </section>
      ))}
    </>
  ) : (
    <></>
  );
}
