import GroupIcon from '@mui/icons-material/Group';
import ScienceIcon from '@mui/icons-material/Science';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';

const sections = [
  {
    id: 1,
    icon: <ScienceIcon sx={{ color: 'white', fontSize: {xs: '30px', md: '50px'} }} />,
    iconBgColor: 'primary.light',
    title: 'Die rein pflanzliche Jala-Life Formel!',
    description:
      'Die Jala-Life Formel wurde entwickelt, um die Aufnahme von Pflanzenwirkstoffen in deinen Körper zu optimieren. Dadurch sind bereits geringe Dosen der Extrakte völlig ausreichend. Unsere Formel unterstützt natürliche Aufnahmemechanismen deines Körpers – ohne diesen dabei „auszutricksen“! Diese Revolution erreichen wir mit nur drei natürlichen Zutaten: Akazienharz, Schweizer Bergquellwasser und Pflanzenextrakt.'
  },
  {
    id: 2,
    icon: <ScienceIcon sx={{ color: 'white', fontSize: {xs: '30px', md: '50px'} }} />,
    iconBgColor: 'primary.light',
    title: 'Hinter unseren Produkten steht fundierte Wissenschaft!',
    description:
      'Die Wissenschaft ist uns besonders wichtig. Aus diesem Grund findest du in Jala-Life Produkten ausschliesslich Pflanzenextrakte, für die überzeugende Daten aus einer Vielzahl von Studien vorhanden sind. Auch wir von Jala-Life sind Teil der modernen Forschung und leisten unseren wissenschaftlichen Beitrag. Zudem werden unsere Extrakte nicht nur von uns, sondern auch von unabhängigen Laboren auf Herz und Nieren geprüft. Deine Sicherheit und deine Lebensqualität sind somit in guten Händen!'
  },
  {
    id: 3,
    icon: <GroupIcon sx={{ color: 'white', fontSize: {xs: '30px', md: '50px'} }} />,
    iconBgColor: 'primary.light',
    title: 'Die Jala-Life Community!',
    description:
      'Tritt der Jala-Life Familie bei und erhalte Zugang zu unserer Facebook Community, die von wissenschaftlichen Experten begleitet wird. Hier kannst du Fragen zu Pflanzenwirkstoffen stellen, über deine Erfolge und Erfahrungen berichten oder mit Gleichgesinnten über das Potenzial von Heilpflanzen diskutieren. Zudem erwarten dich spannende Blogs, Interviews mit Experten und der ein oder andere Workshop, der dein Wissen auf ein höheres Level bringen wird. Gemeinsam bewegen wir die Welt! Also schau vorbei – es wird sich für dich lohnen!'
  }
];

export default function SectionInfo() {
  return (
    <Container
      maxWidth="lg"
      sx={{ position: 'relative', paddingX: '0!important', paddingBottom: { xs: '30px' ,md: '200px'}, paddingTop: { xs: '30px' ,md: '100px'} }}
    >
      <Grid container spacing={5} sx={{'padding': 2}}>
        {sections.map((section) => (
          <Grid item xs={12} md={4} key={section.id}>
            <Paper
              elevation={1}
              sx={{
                p: 4,
                pt:0,
                textAlign: 'left',
                position: 'relative',
                overflow: 'visible',
                mt: 0, // to counteract the translation of icon box
                height: {xs: 'auto', md: '550px'}, // fixed height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: {xs: '50px', md: '90px'},
                  height: {xs: '50px', md: '90px'},
                  display: {xs: 'none', md: 'flex'},
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
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
