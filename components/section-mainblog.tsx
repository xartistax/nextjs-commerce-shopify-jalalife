import { Box, Container, Typography } from '@mui/material';
import { getArticle } from 'lib/shopify';

export default async function SectionMainBlog() {
  const article = await getArticle('gid://shopify/Article/590504591612');

  if (!article) return null;

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative', // Ensure relative positioning for proper layering
        textAlign: 'center',
        overflow: 'hidden' // Prevent overflow issues
      }}
    >
      {/* Background Video */}
      <video
        poster={'organic-frame.jpeg'}
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Cover the entire container
          zIndex: -1 // Ensure the video is behind the content
        }}
      >
        <source src="organic2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
          zIndex: 0 // Behind content but above video
        }}
      />

      {/* Content */}
      <Box sx={{ paddingX: {md: '8rem', xs: '.9rem'}, paddingY:  {md: '10rem', xs: '5rem'}, position: 'relative', zIndex: 1, overflowWrap: 'anywhere' }}>
        <div key={article.id}>
          <Typography
            gutterBottom
            variant="h3"
            component="h2"
            color="white"
            textTransform="uppercase"
            fontWeight="bold"
            fontSize={  { xs: '34px'} }
          >
            {article.title}
          </Typography>
          <Typography component="p" variant="body1" fontWeight="lighter" gutterBottom color="white">
            {article.excerpt} {/* Ensure this matches the field name */}
          </Typography>

          <Box
            component="a"
            href={`/blog/${article.blog.handle}/article/${article.handle}`}
            sx={{
              textDecoration: 'underline',
              color: 'white',
              fontSize: '18px',
              textTransform: 'uppercase',
              display: 'block',
              paddingTop: '32px'
            }}
          >
            {' '}
            Mehr zum Thema{' '}
          </Box>
        </div>
      </Box>
    </Container>
  );
}
