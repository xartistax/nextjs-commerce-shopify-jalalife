'use client';

import { useEffect } from 'react';

interface SubifyWidgetProps {
  productHandle: string;
}

const SubifyWidget: React.FC<SubifyWidgetProps> = ({ productHandle }) => {
  useEffect(() => {
    // Set the SubifyConfig before loading the SDK
    window.SubifyConfig = {
      moneyFormatConfig: {
        "money_format": "<span class=money>€{{amount_with_comma_separator}}</span>",
        "money_with_currency_format": "€{{amount_with_comma_separator}} EUR",
        "sample_fromatted_money": "<span class=money>€1.234,56</span>",
        "sample_formatted_money_with_currency": "€1.234,56 EUR"
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.hengam.io/subify/subify-sdk.js';
    script.defer = true;
    document.body.appendChild(script);

    const onSdkLoaded = () => {
      console.log("Subify SDK loaded successfully");
      console.log("window.subifySdk:", window.subifySdk);
      console.log("Widget wrapper found:", document.querySelector('.widget-wrapper'));
      console.log("Product handle:", productHandle);

      // Now window.Shopify can have just the `shop` property
      window.Shopify = {
        shop: "bexolutionsteststore.myshopify.com"
      };

      if (window.subifySdk) {
        window.subifySdk.renderWidget(productHandle, {
          renderPosition: {
            wrapper: '.widget-wrapper',
            position: 'APPEND',
          },
          sellingPlanInput: {
            wrapper: '.widget-wrapper',
            id: 'selling-plan-input',
          },
          useCardApi: true,
        });
      }
    };

    window.addEventListener("subify:sdkLoaded", onSdkLoaded);

    return () => {
      window.removeEventListener("subify:sdkLoaded", onSdkLoaded);
    };
  }, [productHandle]);

  return (
    <div className="widget-wrapper">
      {/* Das Widget wird hier eingefügt */}
      <input type="hidden" name="selling_plan" id="selling-plan-input" value="692456128832" />
    </div>
  );
};

export default SubifyWidget;
