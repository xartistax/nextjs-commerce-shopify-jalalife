"use client"
import { Fade } from '@mui/material';
import PopUpMessage from 'components/custom-popup';
import { useEffect, useState } from 'react';

const PopUpManager = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);

  // Function to close popup and set the last shown time in localStorage
  const handleClose = () => {
    setPopupOpen(false);
    localStorage.setItem('popupLastShown', new Date().toISOString());
  };

  useEffect(() => {
    const lastShown = localStorage.getItem('popupLastShown');
    const now = new Date();

    // Check if the popup was shown in the past 24 hours
    if (!lastShown || new Date(now - new Date(lastShown)).getTime() > 24 * 60 * 60 * 1000) {
      // Delay popup appearance by 5 seconds
      const timer = setTimeout(() => {
        setDelayPassed(true); // Marks the delay as passed
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, []);

  // Trigger popup only when delay has passed
  useEffect(() => {
    if (delayPassed) {
      setPopupOpen(true);
    }
  }, [delayPassed]);

  return (
    <Fade in={popupOpen} timeout={800}>
      <div>
      <PopUpMessage 
      open={popupOpen}
      onClose={handleClose}
      title="Welt-Diabetes-Tag – Die Bedeutung ganzheitlicher Gesundheit"
      message={
        <>
          Vom 14. bis zum 30. November erhältst Du <strong>10% Rabatt</strong> auf unsere Kurkuma sowie Weihrauch Tropfen! 
          Verwende den Code <strong>DIABETESTAG10</strong> bei Deiner Bestellung und gib Deinem Körper die natürliche 
          Unterstützung, die er verdient.
        </>
      }
      imageUrl="/ad1.png"
      linkText1="Curcuma"
      linkUrl1="/products/curcuma-mit-zink"
      linkText2="Weihrauch"
      linkUrl2="/products/indischer-weihrauch-mit-zink"
    />
      </div>
    </Fade>
  );
};

export default PopUpManager;
