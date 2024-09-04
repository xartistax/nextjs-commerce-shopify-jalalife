import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';

export default function BasicSpeedDial() {
  return (
    <Box
      sx={{
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'fixed',
        zIndex: 1,
        bottom: 16,
        right: 16
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<ShoppingCartIcon sx={{ color: 'white' }} />}
      ></SpeedDial>
    </Box>
  );
}
