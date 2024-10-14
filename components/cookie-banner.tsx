'use client';
import { Box, Button, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// Function to load Shopify's Customer Privacy API
const loadShopifyPrivacyAPI = () => {
  if (typeof window !== 'undefined' && window.Shopify) {
    window.Shopify.loadFeatures(
      [
        {
          name: 'consent-tracking-api',
          version: '0.1'
        }
      ],
      (error) => {
        if (error) {
          console.error('Error loading Shopify Customer Privacy API', error);
        } else {
          console.log('Shopify Customer Privacy API loaded');
        }
      }
    );
  }
};

const CookieConsentBanner = () => {
  const [isBannerVisible, setBannerVisible] = useState(false);
  const [isConsentGiven, setConsentGiven] = useState(false);

  // Load Shopify Privacy API on component mount
  useEffect(() => {
    loadShopifyPrivacyAPI();

    console.log('Checking consent...');

    if (
      window.Shopify &&
      window.Shopify.customerPrivacy &&
      !window.Shopify.customerPrivacy.analyticsProcessingAllowed()
    ) {
      console.log('No consent found. Showing banner.');
      setBannerVisible(true);
    } else {
      console.log('Consent found. Not showing banner.');
    }
  }, []);

  // Function to handle consent acceptance
  const handleConsent = (analyticsConsent: boolean) => {
    if (window.Shopify && window.Shopify.customerPrivacy) {
      window.Shopify.customerPrivacy.setTrackingConsent(
        {
          analytics: analyticsConsent,
          preferences: true // Assuming you want to enable preferences tracking too
        },
        () => {
          console.log('Consent for analytics recorded');
          setConsentGiven(true);
          setBannerVisible(false); // Hide the banner after consent
        }
      );
    }
  };

  return (
    <>
      {isBannerVisible && (
        <Snackbar
          open={isBannerVisible}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          message={
            <Box>
              <Typography>
                Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Mit der Annahme stimmen Sie
                stimmen Sie unserer Verwendung von Cookies für die Analyse zu.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConsent(true)}
                sx={{ mt: 1, color: 'white' }}
              >
                Aktzeptieren
              </Button>
              <Button
                variant="text"
                onClick={() => handleConsent(false)}
                sx={{ mt: 1, color: 'white' }}
              >
                Ablehnen
              </Button>
            </Box>
          }
        />
      )}
      {isConsentGiven && (
        <Typography variant="body2" color="success" align="center" sx={{ mt: 2 }}>
          Thank you for accepting cookie consent for analytics.
        </Typography>
      )}
    </>
  );
};

export default CookieConsentBanner;
