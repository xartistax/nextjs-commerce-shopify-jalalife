// components/ShopifyAnalytics.tsx
'use client'; // This makes the component a Client Component

import { useEffect } from 'react';

export default function ShopifyAnalytics() {
  useEffect(() => {
    // Load Shopify Customer Privacy API on the client side
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
            console.error('Error loading Shopify Customer Privacy API:', error);
            return;
          }

          // Check if analytics processing is allowed after API is loaded
          window.Shopify.customerPrivacy.analyticsProcessingAllowed().then((isAllowed) => {
            if (isAllowed) {
              console.log('Analytics tracking is allowed. Loading Shopify Analytics...');

              // Load Shopify Analytics script
              const shopifyAnalyticsScript = document.createElement('script');
              shopifyAnalyticsScript.src = 'https://cdn.shopify.com/s/shopify-analytics-url.js';
              shopifyAnalyticsScript.async = true;
              document.head.appendChild(shopifyAnalyticsScript);
            } else {
              console.log('Analytics tracking is not allowed.');
            }
          });
        }
      );

      // Listen for consent changes
      document.addEventListener('visitorConsentCollected', (event) => {
        const { analyticsAllowed } = event.detail;
        if (analyticsAllowed) {
          console.log('Consent granted for analytics. Loading Shopify Analytics...');

          const shopifyAnalyticsScript = document.createElement('script');
          shopifyAnalyticsScript.src = 'https://cdn.shopify.com/s/shopify-analytics-url.js';
          shopifyAnalyticsScript.async = true;
          document.head.appendChild(shopifyAnalyticsScript);
        }
      });
    }
  }, []);

  return null; // No need to render anything for this component
}
