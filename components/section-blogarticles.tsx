import { Box, Container } from '@mui/material';
import { getLatestArticles } from 'lib/shopify';
import dynamic from 'next/dynamic';

export default async function SectionBlogArticles() {
  const articles = await getLatestArticles();

  const ArticleItem = dynamic(() => import('./article-item'), { ssr: false });

  console.log(articles);

  if (!articles || articles.length === 0) return null;

  return (
    <Container
      maxWidth="lg"
      sx={{ position: 'relative', paddingX: '0!important', paddingY: '100px' }}
    >
      <Box>
        {articles.map((article, index) => (
          <ArticleItem key={article.id} article={article} reverse={index % 2 !== 0} />
        ))}
      </Box>
    </Container>
  );
}
