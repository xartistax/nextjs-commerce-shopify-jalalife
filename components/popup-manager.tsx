"use client"
import { Box, Fade, Link } from '@mui/material';
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

    const startDate = new Date('2025-03-01');  // Start date (14th November)
    const endDate = new Date('2026-03-31');    // End date (30th November)
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
      title="Sichere Dir 10% zum Darmkrebsmonat 🎗️ 🎗️!
"
      message={
        <>

          <p>
         Der  <strong>Darmkrebsmonat März</strong> erinnert uns daran, wie wichtig die Vorsorge und Unterstützung für unsere Darmgesundheit ist. Natürliche Wirkstoffe wie <strong>Schwarzkümmel</strong>, <strong> Curcuma </strong> und <strong> Weihrauch </strong> können helfen, Entzündungen zu reduzieren, das Immunsystem zu stärken und die Verdauung zu unterstützen.
          <Box className={'mt-5'}>
          <Link className='block' href="/products/indischer-weihrauch-mit-zink">Weihrauch mit Zink</Link>
          <Link className='block'  href="/products/curcuma-mit-zink">Curcuma mit Zink</Link>
          <Link className='block'  href="/schwarzkummel">Schwarzkümmel</Link>
          </Box>

          
          
          <ul className='mt-5'>
            <li> 🎉 <strong> 10% Rabatt </strong> auf Schwarzkümmel, Curcuma und Weihrauch </li>
            <li> 📅 Gültig den ganzen März mit dem Code <strong> DARMWOHL10 </strong> </li>
            <li> <strong>  <Link className='block'  href="/schwarzkummel"> 👉 Jetzt entdecken und Deine Darmgesundheit unterstützen</Link>
              
              
               </strong>  </li>
          </ul>
         <span className='mt-5 block'> Nutze die Kraft der Natur für Deine Gesundheit!</span>
          </p>

          

          










        </>
      }
      imageUrl="/darmkrebsmonat.png"
      linkText1="Jetzt sparen"
      linkUrl1="/shop"
    />
      </div>
    </Fade>
  );
};

export default PopUpManager;
