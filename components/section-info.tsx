'use client';
import Image from 'next/image';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';

const sections = [
  {
    id: 1,
    icon: <Image src={'/svg/boxIcons/Icon_Qualiltat.svg'} alt="" width={50} height={50} />,
    iconBgColor: 'primary.light',
    title: 'Qualität',
    link: '#',
    description:
      'Die Jala-Life Formel optimiert die Aufnahme von Pflanzenwirkstoffen, sodass bereits kleinste Mengen völlig ausreichend sind – und das ohne den Körper auszutricksen. Unsere Rezeptur unterstützt die natürlichen Aufnahmemechanismen des Körpers und besteht aus nur drei reinen, hochwertigen Zutaten: Gummi arabicum, kristallklares Schweizer Bergquellwasser und erstklassige Pflanzenextrakte – Qualität, der du vertrauen kannst!'
  },
  {
    id: 2,
    icon: <Image src={'/svg/boxIcons/Icon_Inhaltsstoffe.svg'} alt="" width={50} height={50} />,
    iconBgColor: 'primary.light',
    title: 'Wissenschaft',
    link: '#',
    description:
      'Unsere Produkte vereinen das Beste aus Wissenschaft und Natur. Wir setzen ausschließlich auf Pflanzenextrakte, die in zahlreichen Studien überzeugende Ergebnisse gezeigt haben. Auch wir tragen aktiv zur Forschung bei und führen in Zusammenarbeit mit renommierten Forschungsgruppen Studien durch. Jala-Life ist das Ergebnis intensiver Forschung und innovativer Entwicklung – bei uns bist du in kompetenten Händen.'
  },
  {
    id: 3,
    icon: <Image src={'/svg/boxIcons/Icon_Produktdetails.svg'} alt="" width={50} height={50} />,
    iconBgColor: 'primary.light',
    title: 'Rohstoffe!',
    link: '#',
    description:
      'Die Basis eines hochwertigen Produkts liegt in der Auswahl der richtigen Rohstoffe. Wir setzen ausschließlich auf natürliche, nachhaltig gewonnene Inhaltsstoffe, die sorgfältig ausgewählt und schonend verarbeitet werden. Qualität und Natürlichkeit stehen bei uns im Vordergrund, damit du nur das Beste aus der Natur erhältst. Die Rohstoffe für unsere Extrakte stammen aus kontrolliertem Anbau und werden regelmäßig von unabhängigen Laboren geprüft – für eine Reinheit, die du spüren kannst.'
  }
];

export default function SectionInfo() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        py: { xs: '30px', md: '100px' }
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
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
