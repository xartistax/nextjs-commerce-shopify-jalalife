// components/layout/Article.tsx

import { Box, Container, Grid, Link, ThemeProvider, Typography } from '@mui/material';
import Footer from 'components/layout/footer';
import Prose from 'components/prose';
import { getArticleByHandle, getLatestArticles } from 'lib/shopify';
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

  const productHandle = `${article?.metafield?.reference.handle}`;

  if (!article) return notFound();

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
                    <Typography gutterBottom variant="h2" component="h1" fontWeight={"bold"}  lineHeight={1}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Published on: {new Date(article.publishedAt).toLocaleDateString()}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      Author: {article.authorV2.name}
                    </Typography>

                    {article.metafield ? (
                      <>
                        <Typography variant="body2" color="textSecondary">
                          {/* Product Link */}
                          <Link
                            href={`/product/${productHandle}`}
                            color="primary"
                            underline="hover"
                          >
                            {article.metafield?.reference.title}
                          </Link>
                        </Typography>
                      </>
                    ) : null}
                  </Box>

                  {/* Article Content */}
                  <Prose className="mb-8" html={article.contentHtml as string} />
                </article>
              </Grid>

              {/* Sidebar for featured articles */}
              <Grid item xs={12} md={4}>
                <Box component={'aside'} className="ps-20" sx={{'paddingLeft' : { xs: '0' ,md: '5rem'}, textAlign: {xs: 'left', md: 'right'}}}>
                  <Typography gutterBottom variant="h4" component="h2" fontWeight={'bold'} className="mb-4 text-2xl font-bold">
                    Weitere Artikel
                  </Typography>
                  {featuredArticles.map((item) => (
                    <div key={item.id} className="mb-4">
                      <Typography variant="h6" component="h3">
                        {item.title}
                      </Typography>
                      <Box
                        component={'a'}
                        href={`/blog/${item.blog.handle}/article/${item.handle}`}
                        sx={{ textDecoration: 'underline', color: 'primary.main' }}
                      >
                        <Typography variant="body2">{truncateText(item.excerpt, 10)}</Typography>
                      </Box>
                    </div>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}
