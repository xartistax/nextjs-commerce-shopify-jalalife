import { Grid, Typography } from '@mui/material';
// Assuming Prose is a component to render HTML
import { convertSchemaToHtml } from '@thebeyondgroup/shopify-rich-text-renderer';
import { getProductMetafields } from 'lib/shopify';
import Prose from './prose';
import InformationNavigation from './single-product-info-navigation';


export async function SingleProductInformations({ product }) {
  const handle = product.handle;
  const identifiers = [
    { key: 'qualitaet', namespace: 'custom', fullName: 'Qualität' },
    { key: 'wirkung', namespace: 'custom', fullName: 'Wirkung' },
    { key: 'swiss_label', namespace: 'custom', fullName: 'Swiss Label' },
    { key: 'anwendung', namespace: 'custom', fullName: 'Anwendung' },
    { key: 'zutaten', namespace: 'custom', fullName: 'Zutaten' },
    { key: 'hinweise', namespace: 'custom', fullName: 'Hinweise' }
  ];

  const metafields = await getProductMetafields(handle, identifiers);

  return metafields && metafields.length > 0 ? (
    <>
      <InformationNavigation />
      {metafields.map(({ metafield, fullName }) => (
        <section
          id={metafield.key}
          className="info-section mx-auto w-full max-w-screen-xl py-4 pt-14"
          key={metafield.key}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography gutterBottom component="h2" variant="h4">
                {fullName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Prose className="mb-6 leading-tight" html={convertSchemaToHtml(metafield.value)} />
            </Grid>
          </Grid>
        </section>
      ))}
    </>
  ) : (
    <></>
  );
}
