// components/PopUpMessage.js
"use client"; // if you’re using the new App Router

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import Image from "next/image";
import { ReactNode } from 'react';



export interface PopUpMessageProps {
    open: boolean;
    onClose: () => void;
    title?: string; // optional, default "Announcement"
    message?: ReactNode; // optional
    imageUrl?: string; // optional
    linkText1?: string; // Text for the first button
    linkUrl1?: string;  // URL for the first button
    linkText2?: string; // Text for the second button
    linkUrl2?: string;  // URL for the second button
  }

const PopUpMessage = ({ 
  open = false, 
  onClose, 
  title = "Announcement", 
  message, 
  imageUrl, 
  linkText1, 
  linkUrl1,
  linkText2,
  linkUrl2
} : PopUpMessageProps ) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {title}
        <IconButton 
          aria-label="close" 
          onClick={onClose} 
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        {imageUrl && (

          <Image 
            src={imageUrl} 
            alt="Announcement Image" 
            style={{ width: '100%', marginBottom: 16, borderRadius: 4 }} 
            width={500}
            height={300}
          />
        )}
        
        {message && (
          <Typography variant="body1" paragraph>
            {message}
          </Typography>
        )}
        
        <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
        {linkUrl1 && linkText1 && (
          <Button 
          variant="outlined" 
            color="primary" 
            href={linkUrl1} 
            target="_blank" 
            rel="noopener noreferrer"
            fullWidth
          >
            {linkText1}
          </Button>
        )}

{linkUrl2 && linkText2 && (
            <Button 
              variant="outlined" 
              color="primary" 
              href={linkUrl2} 
              target="_blank" 
              rel="noopener noreferrer"
              fullWidth
            >
              {linkText2}
            </Button>
          )}
        </Box>
        
      </DialogContent>
    </Dialog>
  );
};

export default PopUpMessage;
