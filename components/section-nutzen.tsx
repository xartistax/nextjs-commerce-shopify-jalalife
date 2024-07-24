'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';

export default function SectionNutzen() {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: { xs: '60px', md: '200px' } }}>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        Natürlichkeit und Nachhaltigkeit
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Box component={'div'} marginBottom={6}>
            <Typography gutterBottom>
              Bei Jala-Life sind wir davon überzeugt, dass echtes Wohlbefinden aus der Natur kommt. Unser Ziel ist es, Menschen zu unterstützen, ihre Gesundheit auf natürliche Weise zu steigern und zu erhalten. Dafür nutzen wir sorgfältig ausgewählte Pflanzenextrakte, die nicht nur in der traditionellen indischen Naturheilkunde seit Jahrtausenden geschätzt werden, sondern auch durch die moderne Wissenschaft in zahlreichen Studien bestätigt sind.
            </Typography>
          </Box>

          <Box component={'div'} marginBottom={6}>
            <Typography fontWeight={'bold'}>
              Unsere einzigartige Jala-Life Formel:
            </Typography>

            <Typography gutterBottom>
              Wir veredeln diese traditionellen Extrakte mit einer speziellen Formel, die auf nur drei natürlichen Zutaten basiert: Akazienharz, Schweizer Bergquellwasser und reinen Pflanzenextrakten. Diese Kombination gewährleistet eine optimale Aufnahme der Wirkstoffe in den Körper, was die Wirksamkeit unserer Produkte maximiert.
            </Typography>
          </Box>

          <Box component={'div'} marginBottom={3}>
            <Typography fontWeight={'bold'}>
              Verpflichtung zu Natürlichkeit und Nachhaltigkeit:
            </Typography>

            <Typography gutterBottom>
              Natürlichkeit und Nachhaltigkeit stehen im Zentrum unserer Unternehmensphilosophie. Wir verpflichten uns, Produkte zu schaffen, die nicht nur effektiv, sondern auch umweltschonend und verantwortungsbewusst sind. Jedes Element unseres Produktionsprozesses reflektiert dieses Engagement – von der sorgfältigen Auswahl der Rohstoffe bis hin zur umweltschonenden Herstellung.
              Mit Jala-Life entscheidest du dich für einen Weg, der Respekt vor der Natur und Vertrauen in ihre Kraft widerspiegelt. Tritt ein in eine Welt, in der Gesundheit und Wohlbefinden Hand in Hand gehen mit der Bewahrung unseres Planeten.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} textAlign={{ xs: 'center', md: 'right' }}>
          <Box
            component="div"
            sx={{
              width: { xs: '100%', md: '80%' },
              display: 'block',
              margin: { xs: '0 auto', md: '0 0 0 auto' },
            }}
          >
            <Image
              src="/smile.webp"
              width={500}
              height={500}
              alt="JalaLife"
              style={{ width: '100%' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
