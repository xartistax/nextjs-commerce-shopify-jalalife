import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import { TruncatedText } from 'lib/client-utils';
import { ShopifyArticle } from 'lib/shopify/types';

interface ArticleItemProps {
  article: ShopifyArticle;
}

export default function ArticleItem({ article }: ArticleItemProps) {
  if (!article) return null;

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={1}
        sx={{
          flex: 1, // Allow the Paper to stretch and fill the height
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box padding={2} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Box
              sx={{
                paddingTop: '56.25%',
                width: '100%',
                backgroundImage: `url(${article.image.url})`,
                backgroundSize: 'cover'
              }}
            >
              {/* Placeholder for Image */}
            </Box>

            {/* Article Title with Link */}

            <Typography
              fontWeight={'900'}
              variant="h5"
              component={'h2'}
              lineHeight={1}
              gutterBottom
              paddingTop={2}
            >
              <Link
                href={`/blogs/news/article/${article.handle}`}
                sx={{ color: 'black', textDecoration: 'none' }}
              >
                {article.title}
              </Link>
            </Typography>

            <Typography component={'span'} variant="caption" gutterBottom color={'primary.main'}>
              {article.metafields[0]?.value}
            </Typography>

            {/*
            <Typography variant="caption" gutterBottom color={'primary.main'}>
              {article.authorV2.name} {/* Replace with article.author when available 
            </Typography> */}

            {/* Article Excerpt */}
            <Typography
              component={'span'}
              paddingTop={2}
              className="text-slate-800"
              sx={{
                wordWrap: 'break-word',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis'
              }}
            >
              <TruncatedText> {article.excerpt}</TruncatedText>
            </Typography>

            <Link href={`/blogs/news/article/${article.handle}`}>
              <Typography variant="caption" gutterBottom color={'primary.main'}>
                weiter Lesen
              </Typography>
            </Link>
          </Box>

          {/* Promotion Section */}
          {/* <Box marginTop={2}>
            {article.metafield ? (
              <>
                <Typography
                  sx={{
                    display: 'inline-block',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: { xs: 'bold' },
                    paddingTop: '24px',
                    color: 'primary.main',
                    margin: '0 8px'
                  }}
                >
                  |
                </Typography>

                <Typography
                  component="a"
                  href={`/products/${article.metafield?.reference.handle}`}
                  sx={{
                    display: 'inline-block',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: { xs: 'bold' },
                    textTransform: 'uppercase',
                    paddingTop: '24px',
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {article.metafield?.reference.title} ansehen
                </Typography>
              </>
            ) : null}
          </Box> */}
        </Box>
      </Paper>
    </Grid>
  );
}
