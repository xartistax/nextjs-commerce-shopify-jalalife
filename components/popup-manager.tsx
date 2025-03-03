"use client";
import { Box, Fade, Link } from "@mui/material";
import PopUpMessage from "components/custom-popup";
import { useEffect, useState } from "react";

const PopUpManager = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);

  // Define a campaign identifier (change this when you update the popup)
  const campaignId = "march_campaign_2025"; // Update for each new campaign

  // Function to close popup and set the last shown time in localStorage
  const handleClose = () => {
    setPopupOpen(false);
    localStorage.setItem("popupLastShown", new Date().toISOString());
    localStorage.setItem("popupCampaign", campaignId); // Store the campaign ID
  };

  useEffect(() => {
    const lastShown = localStorage.getItem("popupLastShown");
    const storedCampaign = localStorage.getItem("popupCampaign"); // Get stored campaign ID
    const now = new Date();

    const startDate = new Date("2025-03-01");
    const endDate = new Date("2025-03-31");
    const currentDate = new Date();

    // Check if the campaign is different (new popup campaign)
    const isNewCampaign = storedCampaign !== campaignId;

    // Check if the popup was shown in the past 24 hours
    const hasPopupExpired =
      !lastShown || now.getTime() - new Date(lastShown).getTime() > 24 * 60 * 60 * 1000;

    // Show popup if it's a new campaign or it expired
    if (isNewCampaign || hasPopupExpired) {
      if (currentDate >= startDate && currentDate <= endDate) {
        // Delay popup appearance by 5 seconds
        const timer = setTimeout(() => {
          setDelayPassed(true);
        }, 5000);

        return () => clearTimeout(timer);
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
          title="Sichere Dir 10% zum Darmkrebsmonat 🎗️ 🎗️!"
          message={
            <>
              <p>
                Der <strong>Darmkrebsmonat März</strong> erinnert uns daran, wie wichtig die Vorsorge und
                Unterstützung für unsere Darmgesundheit ist. Natürliche Wirkstoffe wie <strong>Schwarzkümmel</strong>,
                <strong> Curcuma </strong> und <strong> Weihrauch </strong> können helfen, Entzündungen zu
                reduzieren, das Immunsystem zu stärken und die Verdauung zu unterstützen.
                <Box className={"mt-5"}>
                  <Link className="block" href="/products/indischer-weihrauch-mit-zink">
                    Weihrauch mit Zink
                  </Link>
                  <Link className="block" href="/products/curcuma-mit-zink">
                    Curcuma mit Zink
                  </Link>
                  <Link className="block" href="/products/schwarzkummel">
                    Schwarzkümmel
                  </Link>
                </Box>
                <ul className="mt-5">
                  <li> 🎉 <strong> 10% Rabatt </strong> auf Schwarzkümmel, Curcuma und Weihrauch </li>
                  <li> 📅 Gültig den ganzen März mit dem Code <strong> DARMWOHL10 </strong> </li>
                  <li>
                    <strong>
                      <Link className="block" href="/schwarzkummel">
                        👉 Jetzt entdecken und Deine Darmgesundheit unterstützen
                      </Link>
                    </strong>
                  </li>
                </ul>
                <span className="mt-5 block">Nutze die Kraft der Natur für Deine Gesundheit!</span>
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
