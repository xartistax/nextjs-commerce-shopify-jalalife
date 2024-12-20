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

    const startDate = new Date('2024-12-20');  // Start date (14th November)
    const endDate = new Date('2024-12-26');    // End date (30th November)
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
      title="Sichere Dir 15% auf unser Winterpaket!
"
      message={
        <>

          <strong> 10% zusätzlich – nur für kurze Zeit!  </strong>
          🎉 Zusätzliche 10% Rabatt auf das neue Winterpaket!
Der Winter bringt nicht nur kalte Temperaturen, sondern stellt auch Dein Immunsystem vor besondere Herausforderungen. Mit unserem Jala-Life Winterpaket bist Du bestens vorbereitet! Dieses Paket vereint sechs kraftvolle natürliche Wirkstoffe, die Dein Immunsystem stärken, Stress reduzieren und Dein Wohlbefinden fördern.

Doppelt sparen: Unsere Pakete sind immer mit 15% Rabatt erhältlich – nur vom 20. bis 27. Dezember erhältst Du zusätzliche 10% Rabatt mit dem Code WINTER10. Jetzt ist der perfekte Moment, Deine Gesundheit nachhaltig zu unterstützen!

🎟️ Rabattcode: WINTER10



        </>
      }
      imageUrl="/Winterpaket-popup.png"
      linkText1="Jetzt sparen"
      linkUrl1="/products/winterpaket"
    />
      </div>
    </Fade>
  );
};

export default PopUpManager;
