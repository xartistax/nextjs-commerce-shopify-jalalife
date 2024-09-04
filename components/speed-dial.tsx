// components/speed-dial.tsx
import { Grid, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface BasicSpeedDialProps {
  title: string;
  imageSrc: string;
}

export default function BasicSpeedDial({ title, imageSrc }: BasicSpeedDialProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        zIndex: 1,
        bottom: 16,
        right: 16,
        maxWidth: '500px',
        py: 1,
        paddingLeft: 1,
        paddingRight: 3
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Box
            sx={{
              padding: 1,
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              height: '50px',
              width: '50px',
              display: 'flex', // Use flexbox to center the image
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white'
            }}
          >
            <Box
              component="img"
              sx={{
                height: '100%', // Make the image fill the container's height
                width: 'auto',
                maxHeight: { xs: 50, md: 50 },
                maxWidth: { xs: 50, md: 50 }
              }}
              alt={title}
              src={imageSrc}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ fontWeight: 'bold' }}>
            <Typography variant="body2" fontWeight={900} lineHeight={1} textTransform={'uppercase'}>
              {title}
            </Typography>
            <Typography variant="body2" fontWeight={900} sx={{ color: 'primary.main' }}>
              jetzt kaufen!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
