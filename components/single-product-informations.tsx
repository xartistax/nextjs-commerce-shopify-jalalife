import { Grid, Typography } from '@mui/material';
import { getProductMetafields } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import InformationNavigation from './single-product-info-navigation';

export async function SingleProductInformations({ product }: { product: Product }) {
  const handle = product.handle;
  const identifiers = [
    { key: 'qualitaet', namespace: 'custom', name: 'Qualität' },
    { key: 'wirkung', namespace: 'custom', name: 'Wirkung' },
    { key: 'swiss_label', namespace: 'custom', name: 'Swiss Label' },
    { key: 'anwendung', namespace: 'custom', name: 'Anwendung' },
    { key: 'zutaten', namespace: 'custom', name: 'Zutaten' },
    { key: 'hinweise', namespace: 'custom', name: 'Hinweise' }
  ];

  const metafields = await getProductMetafields(handle, identifiers);

  // Render the fetched metafields in your component
  return metafields && metafields.length > 0 ? (
    <>
      <InformationNavigation />
      {metafields.map((field) => (
        <section
          id={field.key}
          className="info-section mx-auto w-full max-w-screen-xl py-4 pt-14"
          key={field.key}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography gutterBottom component="h2" variant="h4">
                {field.key}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              {field.value}
              {/* <Prose className="mb-6 leading-tight" html={field.value, true} /> */}
            </Grid>
          </Grid>
        </section>
      ))}
    </>
  ) : (
    <></>
  );
}
