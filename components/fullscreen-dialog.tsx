import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { Survey } from 'survey-react-ui';
import { configureSurvey, getProducts } from 'survey/survey-config';
import { SurveyResponse } from 'survey/types';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps {
  openButtonLabel: string;
  title: string;
  onClose?: () => void;
}

export default function FullScreenDialog({
  openButtonLabel,
  title,
  onClose
}: FullScreenDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const survey = configureSurvey();

  survey.onComplete.add((sender) => {
    const products: string[] = getProducts(sender.data as SurveyResponse);
    console.log(products);
  });

  return (
    <React.Fragment>
      <Button variant="outlined" size="large" onClick={handleClickOpen}>
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

        <Grid container>
          <Grid item sm={8}>
            {' '}
            <Survey model={survey} />{' '}
          </Grid>
          <Grid item sm={4}></Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
