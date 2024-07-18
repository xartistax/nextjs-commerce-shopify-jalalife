import type { Metadata } from 'next';

import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: ' page.seo?.title' || 'page.title',
    description: 'page.seo?.description' || 'page.bodySummary',
    openGraph: {
      publishedTime: 'page.createdAt',
      modifiedTime: 'page.updatedAt',
      type: 'article'
    }
  };
}

export default async function JalaPage() {
  const employees = [
    {
      name: 'Josef Goop',
      role: 'Software Engineer',
      imageUrl: '/josef.webp', // Make sure to have these images in your public/images directory
      bio: 'Nach einer langen Zeit als Landwirt war Josef bei der liechtensteinischen Landespolizei als Einsatzleiter und Instruktor tätig. Nach 16 Jahren im Dienste der Öffentlichkeit entschied er sich schliesslich dazu, seinem Wunsch „Menschen zu helfen“ nachzugehen.  Während seiner Zeit als Polizist erlebte er am eigenen Körper, wie sich Stress, Schlafstörungen und Entzündungen auf die physische und auch psychische Gesundheit auswirken können. Nach erfolgslosen schulmedizinischen Behandlungsansätzen, die nicht selten von starken Nebenwirkungen geprägt waren, suchte Josef nach pflanzlichen Alternativen. Heute fühlt sich Josef durch „die Kraft der Natur“ gesünder und vitaler denn je! '
    },
    {
      name: 'Dr. Angelo Pidroni | PhD',
      role: 'Product Manager',
      imageUrl: '/221102_00385_m_-_Cut.webp', // Make sure to have these images in your public/images directory
      bio: 'Angelo ist promovierter Molekular- und Mikrobiologe und war jahrelang in der Forschung tätig. Zudem publizierte er seine Forschungsarbeit mehrfach in wissenschaftlichen Fachzeitschriften. Nach erfolgreichem Abschluss seiner Forschungsprojekte entschied er sich, die Grundlagenforschung hinter sich zu lassen und das unglaubliche therapeutische Potenzial von Pflanzenwirkstoffen in die Welt hinauszutragen. Bereits seit vielen Jahren beschäftigt sich Angelo mit der molekularen Wirkungsweise von Pflanzenwirkstoffen und eignet sich stetig neues Fachwissen an. Heute leitet er unsere Forschungs- und Entwicklungsabteilung, wo er jeden Tag mit neuen Herausforderungen konfrontier wird und seine Expertise einsetzten kann. '
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        {employees.map((employee) => (
          <Grid item xs={12} md={6} key={employee.name}>
            <Box flexShrink={0} mr={{ xs: 0, md: 2 }} mb={{ xs: 2, md: 0 }}>
              <Image
                src={employee.imageUrl}
                alt={employee.name}
                width={300}
                height={300}
                style={{ width: '80%', height: 'auto', marginBottom: '2rem' }}
              />
            </Box>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center">
              <Box>
                <Typography
                  variant="h4"
                  component={'h2'}
                  sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                  gutterBottom
                >
                  {employee.name}
                </Typography>
                <Typography variant="body1">{employee.bio}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
