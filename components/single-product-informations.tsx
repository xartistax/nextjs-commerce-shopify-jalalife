import { Grid, Stack, Typography } from '@mui/material';
import { getProductMetafields } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { identifiers } from 'lib/utils';
import Image from 'next/image';
import { toHTML } from 'utils/json-to-html';
import Prose from './prose';
import InformationNavigation from './single-product-info-navigation';

export async function SingleProductInformations({ product }: { product: Product }) {
  const handle = product.handle;

  const metafields = await getProductMetafields(handle, identifiers);

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
                <Image src={`/icons/Icon_${fullName}.svg`} alt={''} width={50} height={50} />

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

      {/* Your additional section */}
      <section
        id="jalaLife_info"
        className="info-section mx-auto w-full max-w-screen-xl py-4"
        key="jalaLife_info"
      >
        <Grid container spacing={2} alignItems="top">
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Image src={`/logo_schwarz_full.webp`} alt={''} width={50} height={50} />
              <Typography
                gutterBottom
                component="h2"
                variant="h4"
                sx={{ fontWeight: { xs: 'bold', md: 'normal' } }}
              >
                Jala Life
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>
              {/* Your content for Jala Life */}
              Wir möchten Menschen dabei unterstützen, ihre Gesundheit und ihr Wohlbefinden auf
              natürliche Weise zu steigern und zu erhalten...
            </Typography>
          </Grid>
        </Grid>
      </section>
    </>
  ) : (
    <></>
  );
}
