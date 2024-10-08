'use';
import Masonry from '@mui/lab/Masonry';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Link,
  Typography
} from '@mui/material';
import Footer from 'components/layout/footer';
import { getLatestArticles } from 'lib/shopify';
import { truncateText } from 'utils/truncate';

export default async function BlogArchive() {
  const posts = await getLatestArticles(99);
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Blog Archive Heading */}
        <Typography variant="h1" gutterBottom>
          Blog Archive
        </Typography>

        {/* Grid to display posts in a responsive layout */}
        <Masonry key={posts.length} columns={2} spacing={2}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                variant="outlined"
                sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  {/* Text Section */}
                  <Box sx={{ flexGrow: 1, pr: 2 }}>
                    <Typography variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                      {new Date(post.publishedAt).toLocaleDateString('de-CH')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {truncateText(post.excerpt, 100)}
                    </Typography>
                  </Box>

                  {/* Image Section */}
                  <Box
                    component="img"
                    src={post.image.url}
                    alt={post.title}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '8px',
                      objectFit: 'cover',
                      ml: 2 // margin-left to provide space between text and image
                    }}
                  />
                </CardContent>

                {/* Actions Section */}
                <CardActions>
                  <Button
                    size="small"
                    href={`news/article/${post.handle}`}
                    component={Link}
                    underline="none"
                    color="primary"
                  >
                    Artikel lesen
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Masonry>
      </Container>

      <Footer />
    </>
  );
}
