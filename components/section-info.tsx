import GroupIcon from '@mui/icons-material/Group';
import ScienceIcon from '@mui/icons-material/Science';

import { Box, Container, Grid, Link, Paper, Typography } from '@mui/material';

const sections = [
  {
    id: 1,
    icon: <ScienceIcon sx={{ color: 'white', fontSize: { xs: '30px', md: '50px' } }} />,
    iconBgColor: 'primary.light',
    title: 'Qualität',
    link: '#',
    description:
      'Die Jala-Life Formel optimiert die Aufnahme von Pflanzenwirkstoffen in deinem Körper, sodass geringe Dosen ausreichend sind. Unsere Formel unterstützt die natürlichen Aufnahmemechanismen deines Körpers – ohne Tricks! Dies erreichen wir mit nur drei natürlichen Zutaten: Akazienharz, Schweizer Bergquellwasser und Pflanzenextrakt.'
  },
  {
    id: 2,
    icon: <ScienceIcon sx={{ color: 'white', fontSize: { xs: '30px', md: '50px' } }} />,
    iconBgColor: 'primary.light',
    title: 'Wissenschaft',
    link: '#',
    description:
      'Wissenschaft ist uns wichtig. Jala-Life Produkte enthalten ausschließlich Pflanzenextrakte mit überzeugenden Studienergebnissen. Wir tragen zur modernen Forschung bei, und unsere Extrakte werden von unabhängigen Laboren geprüft. Deine Sicherheit und Lebensqualität sind bei uns in guten Händen!'
  },
  {
    id: 3,
    icon: <GroupIcon sx={{ color: 'white', fontSize: { xs: '30px', md: '50px' } }} />,
    iconBgColor: 'primary.light',
    title: 'Community!',
    link: '#',
    description:
      'Tritt der Jala-Life Familie bei und erhalte Zugang zu unserer von Experten begleiteten Facebook Community. Stelle Fragen, berichte über Erfahrungen und diskutiere mit Gleichgesinnten über Heilpflanzen. Freu dich auf spannende Blogs, Experteninterviews und Workshops, die dein Wissen erweitern!'
  }
];

export default function SectionInfo() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        paddingX: '0!important',
        paddingBottom: { xs: '30px', md: '200px' },
        paddingTop: { xs: '30px', md: '100px' }
      }}
    >
      <Grid container spacing={5} sx={{ padding: 2 }}>
        {sections.map((section) => (
          <Grid item xs={12} md={4} key={section.id}>
            <Paper
              elevation={1}
              sx={{
                p: 4,
                pt: 5,
                textAlign: 'left',
                position: 'relative',
                overflow: 'visible',
                mt: 0, // to counteract the translation of icon box
                height: { xs: 'auto', md: '450px' }, // fixed height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'top'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: { xs: '50px', md: '90px' },
                  height: { xs: '50px', md: '90px' },
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: section.iconBgColor,
                  borderRadius: '50%',
                  boxShadow: 1
                }}
              >
                {section.icon}
              </Box>
              <Box sx={{ mt: 6 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  lineHeight={1}
                  fontWeight={'bold'}
                >
                  {section.title}
                </Typography>
                <Typography variant="body1" component="p">
                  {section.description}
                </Typography>
                <Link href="#" variant="body2" marginTop={3} display={'block'}>
                  {' '}
                  {'>> '}mehr erfahren
                </Link>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
