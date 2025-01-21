import { Box, Container, Typography } from '@mui/material';

import { getArticleByHandle } from 'lib/shopify';

export default async function SectionBioBlog() {
  const article = await getArticleByHandle('news', 'bioverfugbarkeit');

  if (!article) return null;

  return (
    <>
      {/* <Head>
       
        <link rel="preload" href="/bio.mp4" as="video" />
      </Head> */}

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          my: '50px',
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
          <source src="/bio.mp4" type="video/mp4" />
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
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
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
          <div key={article?.id}>
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
              {article?.title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              fontWeight="lighter"
              gutterBottom
              color="white"
            >
              {article?.excerpt}
            </Typography>

            <Box
              component="a"
              href={`/blogs/${article?.blog.handle}/article/${article?.handle}`}
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
