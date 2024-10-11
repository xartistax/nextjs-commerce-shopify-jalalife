import { Box, Button, Container, Grid, Link, ThemeProvider, Typography } from '@mui/material';
import Footer from 'components/layout/footer';
import Prose from 'components/prose';
import { getArticleByHandle, getLatestArticles, getProductById } from 'lib/shopify';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { theme } from 'theme';
import { truncateText } from 'utils/truncate';

export async function generateMetadata({
  params
}: {
  params: { blog: string; article: string };
}): Promise<Metadata> {
  const article = await getArticleByHandle(params.blog, params.article);

  if (!article) return notFound();

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    openGraph: {
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      type: 'article'
    }
  };
}

export default async function Article({ params }: { params: { blog: string; article: string } }) {
  const article = await getArticleByHandle(params.blog, params.article);
  const moreArticles = await getLatestArticles();

  const promo_product = article?.metafields?.[1]?.value
    ? await getProductById(article.metafields[1].value)
    : null;
  const author = article?.metafields?.[0]?.value || 'Unknown Author';

  if (!article) return notFound();

  const featuredArticles = moreArticles;

  return (
    <>
      <ThemeProvider theme={theme}>
        <main>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <article>
                  {article.image && (
                    <Box mb={4}>
                      <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        width={800}
                        height={450}
                        style={{ borderRadius: '8px' }}
                      />
                    </Box>
                  )}

                  <Box mb={4}>
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="h1"
                      fontWeight={'bold'}
                      lineHeight={1}
                    >
                      {article.title}
                    </Typography>

                    <Typography variant="caption" gutterBottom color={'primary.main'}>
                      {author && (
                        <>
                          Author: {author} <br />
                        </>
                      )}
                      {promo_product && (
                        <>
                          Produkt:{' '}
                          <Link href={`/products/${promo_product.handle}`}>
                            {promo_product.title}
                          </Link>
                        </>
                      )}
                    </Typography>
                  </Box>

                  <Prose className="leading-tight" html={article.contentHtml} />
                </article>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  component={'aside'}
                  className="ps-20"
                  sx={{
                    paddingLeft: { xs: '0', md: '5rem' },
                    textAlign: { xs: 'left', md: 'left' }
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    fontWeight={'bold'}
                    className="mb-4 text-2xl font-bold"
                  >
                    Weitere Artikel
                  </Typography>
                  {featuredArticles.map((item) => (
                    <Grid container key={item.id} className="mb-4" spacing={2} alignItems="top">
                      <Grid item xs={2}>
                        <Image
                          src={item.image.url}
                          alt={item.image.altText || item.title}
                          width={50}
                          height={40}
                          style={{ borderRadius: '8px' }}
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="h6" component="h3" fontSize={'1rem'} lineHeight={1}>
                          {item.title}
                        </Typography>
                        <Box
                          component={'a'}
                          href={`/blogs/${item.blog.handle}/article/${item.handle}`}
                          sx={{ textDecoration: 'underline', color: 'primary.main' }}
                        >
                          <Typography variant="body2">{truncateText(item.excerpt, 10)}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Grid>

            {/* Promotional Product Section */}
            {promo_product && (
              <Box
                sx={{
                  mt: 6,
                  p: 4,
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Typography variant="h4" fontWeight={'bold'} mb={4}>
                  Special Promotion: {promo_product.title}
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  {/* Product Image on the left */}
                  <Grid item xs={12} md={4}>
                    {promo_product.images?.[0]?.url && (
                      <Image
                        src={promo_product.images[0].url}
                        alt={promo_product.title}
                        width={300}
                        height={300}
                        style={{ borderRadius: '8px' }}
                      />
                    )}
                  </Grid>

                  {/* Product details on the right */}
                  <Grid item xs={12} md={8}>
                    <Typography component={'span'} variant="body1" mb={2}>
                      <Prose className="leading-tight" html={promo_product.descriptionHtml} />
                    </Typography>
                    <Typography variant="h6" color={'primary.main'} mb={2}>
                      Price: {promo_product.priceRange?.minVariantPrice?.amount}{' '}
                      {promo_product.priceRange?.minVariantPrice?.currencyCode}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/products/${promo_product.handle}`}
                    >
                      Zum Produkt
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}
