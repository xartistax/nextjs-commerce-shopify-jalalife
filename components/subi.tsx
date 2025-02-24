'use client';

import { useEffect } from 'react';

interface SubifyWidgetProps {
  productHandle: string;
}

const SubifyWidget: React.FC<SubifyWidgetProps> = ({ productHandle }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.hengam.io/subify/subify-sdk.js';
    script.defer = true;
    document.body.appendChild(script);

    const onSdkLoaded = () => {
      console.log("Subify SDK loaded successfully");
      console.log("window.subifySdk:", window.subifySdk);
      console.log("Widget wrapper found:", document.querySelector('.widget-wrapper'));
      console.log("Product handle:", productHandle);




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
      Widget goes here
      <input type="hidden" name="selling_plan" id="selling-plan-input" value="692456128832" />
    </div>
  );
};

export default SubifyWidget;
