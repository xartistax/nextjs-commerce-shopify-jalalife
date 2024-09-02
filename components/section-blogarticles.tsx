import { Container, Grid } from '@mui/material';
import { getLatestArticles } from 'lib/shopify';
import dynamic from 'next/dynamic';

export default async function SectionBlogArticles() {
  const articles = await getLatestArticles();

  const ArticleItem = dynamic(() => import('./article-item'), { ssr: false });

  if (!articles || articles.length === 0) return null;

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        paddingX: { md: '0 !important' },
        paddingY: { xs: '30px', md: '100px' }
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: 'stretch' // Ensure all items stretch to the same height
        }}
      >
        {articles.slice(1, 4).map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </Grid>
    </Container>
  );
}
