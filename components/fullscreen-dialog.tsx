import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps {
  openButtonLabel: string;
  title: string;
  content: React.ReactNode;
  onClose?: () => void;
}

export default function FullScreenDialog({
  openButtonLabel,
  title,
  content,
  onClose
}: FullScreenDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {openButtonLabel}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>{content}</List>
      </Dialog>
    </React.Fragment>
  );
}
