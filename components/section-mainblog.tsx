import { Box, Container, Typography } from '@mui/material';

import { getLatestArticles } from 'lib/shopify';

export default async function SectionMainBlog() {
  const article = await getLatestArticles();

  if (!article) return null;

  return (
    <>
      {/* <Head>
        <link rel="preload" href="/jala_life_plfanzen_extrakte_high.mp4" as="video" />
      </Head> */}

      <Typography
        gutterBottom
        component={'h1'}
        variant="h2"
        fontWeight={'bold'}
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          textAlign: { xs: 'left', md: 'center' },
          mb: { xs: 4, md: 6 } // Margin bottom for spacing from title to content
        }}
      >
        Next Generation Plant-Extract
      </Typography>

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Background Video */}

        <video
          poster="poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          width="320"
          height="240"
          preload="metadata"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1
          }}
        >
          <source src="/jala_life_plfanzen_extrakte_high.mp4" type="video/mp4" />
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
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            zIndex: 0
          }}
        />

        {/* Content */}
        <Box
          sx={{
            paddingX: { md: '8rem', xs: '.9rem' },
            paddingY: { md: '10rem', xs: '5rem' },
            position: 'relative',
            zIndex: 1,
            overflowWrap: 'anywhere',
            textAlign: 'center'
          }}
        >
          <div key={article[0]?.id}>
            <Typography
              gutterBottom
              variant="h3"
              component="h2"
              color="white"
              textTransform="uppercase"
              fontWeight="bold"
              fontSize={{ xs: '34px' }}
              sx={{ mb: 2 }}
            >
              {article[0]?.title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              fontWeight="lighter"
              gutterBottom
              color="white"
            >
              {article[0]?.excerpt}
            </Typography>

            <Box
              component="a"
              href={`/blogs/${article[0]?.blog.handle}/article/${article[0]?.handle}`}
              sx={{
                textDecoration: 'underline',
                color: 'white',
                fontSize: '18px',
                textTransform: 'uppercase',
                display: 'block',
                paddingTop: '32px'
              }}
            >
              <Typography>Mehr zum Thema</Typography>
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
}
