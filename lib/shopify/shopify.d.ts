// shopify.d.ts

// eslint-disable-next-line no-unused-vars
interface ShopifyCustomerPrivacy {
  preferencesProcessingAllowed: () => boolean;
  analyticsProcessingAllowed: () => boolean;
  marketingAllowed: () => boolean;
  saleOfDataAllowed: () => boolean;
  setTrackingConsent: (consent: Record<string, boolean>, callback?: () => void) => void;
  currentVisitorConsent: () => Record<string, boolean>;
}

// eslint-disable-next-line no-unused-vars
interface Shopify {
  loadFeatures?: (
    features: { name: string; version: string }[],
    callback: (error: boolean) => void
  ) => void;
  customerPrivacy?: ShopifyCustomerPrivacy;  // Make it optional
  shop?: string;  // Make the shop property optional
}

// eslint-disable-next-line no-unused-vars
interface Window {
  Shopify: Shopify;
}
