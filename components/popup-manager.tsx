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

    const startDate = new Date('2024-11-14');  // Start date (14th November)
  const endDate = new Date('2024-11-30');    // End date (30th November)
  const currentDate = new Date(); 

    // Check if the popup was shown in the past 24 hours
    if (!lastShown || new Date(now).getTime() - new Date(lastShown).getTime() > 24 * 60 * 60 * 1000) {
        // Check if current date is within the range of start and end dates
        if (currentDate >= startDate && currentDate <= endDate) {
          // Delay popup appearance by 5 seconds
          const timer = setTimeout(() => {
            setDelayPassed(true); // Marks the delay as passed
          }, 5000);
    
          return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
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
      title="Black Friday – Sichere Dir 15% auf alle Paket-Bundles!
"
      message={
        <>

          <strong> 15% zusätzlich auf alle Jala-Life Powerpakete – nur für kurze Zeit </strong>
Dieses Black-Friday-Wochenende schenken wir Dir 15% Rabatt auf unsere beliebten Paket-Bundles. Nutze die Gelegenheit, um Dich mit unseren natürlichen Wirkstoff-Kombinationen einzudecken, die Dein Immunsystem stärken, Stress reduzieren und Dein Wohlbefinden fördern.

        </>
      }
      imageUrl="/bf24.png"
      linkText1="Jetzt sparen"
      linkUrl1="/shop"
    />
      </div>
    </Fade>
  );
};

export default PopUpManager;
