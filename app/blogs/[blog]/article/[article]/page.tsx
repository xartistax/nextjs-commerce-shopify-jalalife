// components/layout/Article.tsx

import { Box, Container, Grid, Link, ThemeProvider, Typography } from '@mui/material';
import FullScreenDialog from 'components/fullscreen-dialog';
import Footer from 'components/layout/footer';
import Prose from 'components/prose';
import { handleFullScreenClose } from 'components/section-finder';
import { getArticleByHandle, getLatestArticles, getProductById } from 'lib/shopify';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { theme } from 'theme';
import { truncateText } from 'utils/truncate';
// Truncate text function

// Function to fetch metadata for SEO
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

// Component for rendering the article
export default async function Article({ params }: { params: { blog: string; article: string } }) {
  const article = await getArticleByHandle(params.blog, params.article);
  const moreArticles = await getLatestArticles();

  const promo_product = article?.metafields?.[1]?.value
    ? await getProductById(article.metafields[1].value)
    : null;
  const author = article?.metafields?.[0]?.value || 'Unknown Author';

  if (!article) return notFound();

  console.log(promo_product?.title);
  console.log(author);

  // Dummy data for featured articles (replace with actual logic to fetch featured articles)
  const featuredArticles = moreArticles;

  return (
    <>
      <ThemeProvider theme={theme}>
        <main>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {/* Main article content */}
              <Grid item xs={12} md={8}>
                <article>
                  {/* Feature Image */}
                  {article.image && (
                    <Box mb={4}>
                      <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        width={800} // Adjust width according to your layout
                        height={450} // Adjust height according to your layout
                        style={{ borderRadius: '8px' }}
                      />
                    </Box>
                  )}

                  {/* Metadata Section */}
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
                    {/* <Typography variant="body2" color="textSecondary">
                      Published on: {new Date(article.publishedAt).toLocaleDateString()}
                    </Typography> */}

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

                    {/* {article.metafield ? (
                      <>
                        <Typography variant="body2" color="textSecondary">
                         
                          <Link
                            href={`/products/${productHandle}`}
                            color="primary"
                            underline="hover"
                          >
                            {article.metafield?.reference.title}
                          </Link>
                        </Typography>
                      </>
                    ) : null} */}
                  </Box>

                  {/* Article Content */}

                  <Prose className="leading-tight" html={article.contentHtml} />
                </article>
              </Grid>

              {/* Sidebar for featured articles */}
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
                      {/* Image on the left */}
                      <Grid item xs={2}>
                        <Image
                          src={item.image.url}
                          alt={item.image.altText || item.title}
                          width={50} // Adjust width according to your layout
                          height={40} // Adjust height according to your layout
                          style={{ borderRadius: '8px' }}
                        />
                      </Grid>

                      {/* Content on the right */}
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

            <Box sx={{ mt: 6 }}>
              <FullScreenDialog
                openButtonLabel="Welche Produkte passen zu mir?"
                title="Produktefinder"
                onClose={handleFullScreenClose}
              />
            </Box>
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}
