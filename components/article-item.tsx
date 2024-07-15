import { Box, Grid, Typography } from '@mui/material';
import { ShopifyArticle } from 'lib/shopify/types';

interface ArticleItemProps {
  article: ShopifyArticle;
  reverse: boolean;
}

export default function ArticleItem({ article, reverse }: ArticleItemProps) {
  if (!article) return null;

  return (
    <Grid container spacing={0} sx={{ paddingY: '75px' }}>
      {reverse ? (
        <>
          <Grid
            item
            xs={7}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box sx={{ width: '100%', height: 'auto', paddingRight: '20%' }}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
              >
                {article.title}
              </Typography>
              <Typography variant="body1" component="p" fontWeight="lighter">
                {article.excerpt}
              </Typography>
              <Box>
                <Typography
                  component="a"
                  href={`/blog/${article.blog.handle}/article/${article.handle}`}
                  sx={{
                    display: 'inline-block',
                    textAlign: 'left',
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    paddingTop: '24px',
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Weiter lesen
                </Typography>

                {article.metafield ? (
                  <>
                    <Typography
                      sx={{
                        display: 'inline-block',
                        textAlign: 'left',
                        fontSize: '16px',
                        paddingTop: '24px',
                        color: 'primary.main',
                        margin: '0 8px'
                      }}
                    >
                      |
                    </Typography>

                    <Typography
                      component="a"
                      href={`/product/${article.metafield?.reference.handle}`}
                      sx={{
                        display: 'inline-block',
                        textAlign: 'left',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        paddingTop: '24px',
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Zum Produkt
                    </Typography>
                  </>
                ) : null}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={{
                width: '100%',
                paddingTop: '100%', // This sets the height to maintain 1:1 aspect ratio (100% of width)
                position: 'relative',
                backgroundColor: 'primary.main', // Replace with your desired background color
                backgroundImage: `url(${article.image.url})`, // Add your background image here
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay content */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1, // Ensure the overlay is above the background image
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff', // Text color for overlay content
                  textAlign: 'center',
                  padding: '1rem'
                }}
              ></Box>
            </Box>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={5}>
            <Box sx={{ width: '100%', height: 'auto' }}>
              <Box
                sx={{
                  width: '100%',
                  paddingTop: '100%', // This sets the height to maintain 1:1 aspect ratio (100% of width)
                  position: 'relative',
                  backgroundColor: 'primary.main', // Replace with your desired background color
                  backgroundImage: `url(${article.image.url})`, // Add your background image here
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Overlay content */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1, // Ensure the overlay is above the background image
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff', // Text color for overlay content
                    textAlign: 'center',
                    padding: '1rem'
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}></Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={7}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box sx={{ width: '100%', height: 'auto', paddingLeft: '20%' }}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
              >
                {article.title}
              </Typography>
              <Typography variant="body1" component="p">
                {article.excerpt}
              </Typography>
              <Box>
                <Typography
                  component="a"
                  href={`/blog/${article.blog.handle}/article/${article.handle}`}
                  sx={{
                    display: 'inline-block',
                    textAlign: 'left',
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    paddingTop: '24px',
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Weiter lesen
                </Typography>

                {article.metafield ? (
                  <>
                    <Typography
                      sx={{
                        display: 'inline-block',
                        textAlign: 'left',
                        fontSize: '16px',
                        paddingTop: '24px',
                        color: 'primary.main',
                        margin: '0 8px'
                      }}
                    >
                      |
                    </Typography>

                    <Typography
                      component="a"
                      href={`/product/${article.metafield?.reference.handle}`}
                      sx={{
                        display: 'inline-block',
                        textAlign: 'left',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        paddingTop: '24px',
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Zum Produkt
                    </Typography>
                  </>
                ) : null}
              </Box>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
}
