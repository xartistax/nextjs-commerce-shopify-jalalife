'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const items = [
  {
    title: 'Optimale Aufnahme in den Körper',
    content:
      'Unsere Extrakte werden durch einen einzigartigen Prozess mit Akazienharz veredelt. Dies ermöglicht, dass jeder eingenommene Tropfen schnell und effizient im Körper dort ankommt, wo er benötigt wird.',
    image: '/icon_11.avif'
  },
  {
    title: 'Wissenschaftlich belegt',
    content:
      'Wir verwenden ausschliesslich Pflanzenwirkstoffe, die in der klinischen Forschung seit Jahrzehnten erforscht, geprüft und erprobt werden. Die Ergebnisse dieser Studien lassen die Wissenschaft immer wieder staunen!',
    image: '/icon_2.webp'
  },
  {
    title: 'Nachhaltig und Swissmade',
    content:
      'Um die bestmögliche Qualität sicherzustellen, werden unsere Produkte unter höchsten Qualitätsanforderungen ausschliesslich in der Schweiz entwickelt und hergestellt.',
    image: '/swiss.avif'
  }
];

export default function SectionNutzen() {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: { xs: '60px', md: '200px' } }}>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid key={index} item sm={4}>
            <Box textAlign={'center'}>
              <Box
                sx={{
                  mb: 2, // Margin-bottom to space out the image and the title
                  width: '100%',
                  height: 'auto',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', maxWidth: '150px', height: 'auto', borderRadius: '8px' }} // Adjust styles as needed
                />
              </Box>
              <Typography component={'h2'} variant="h5" gutterBottom fontWeight={'900'}>
                {item.title}
              </Typography>
              <Typography variant="body1">{item.content}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
