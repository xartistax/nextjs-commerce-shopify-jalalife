import { json } from 'survey';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { normalizeKey, symptomToProductsMap } from './product-mapper';
import { SurveyResponse } from './types';

export function configureSurvey(): Model {
  const survey = new Model(json);
  survey.applyTheme({
    themeName: 'sharp',
    colorPalette: 'light',
    isPanelless: false,
    backgroundImage: '',
    backgroundOpacity: 1,
    backgroundImageAttachment: 'scroll',
    backgroundImageFit: 'cover',
    cssVariables: {
      '--sjs-corner-radius': '4px',
      '--sjs-base-unit': '8px',
      '--sjs-shadow-small': '0px 0px 0px 1px rgba(0, 0, 0, 0.2)',
      '--sjs-shadow-inner': '0px 0px 0px 1px rgba(0, 0, 0, 0.25)',
      '--sjs-border-default': 'rgba(0, 0, 0, 0.25)',
      '--sjs-border-light': 'rgba(0, 0, 0, 0.25)',
      '--sjs-general-backcolor': 'rgba(255, 255, 255, 1)',
      '--sjs-general-backcolor-dark': 'rgba(228, 228, 228, 1)',
      '--sjs-general-backcolor-dim-light': 'rgba(238, 238, 238, 1)',
      '--sjs-general-backcolor-dim-dark': 'rgba(220, 220, 220, 1)',
      '--sjs-general-forecolor': 'rgba(0, 0, 0, 0.91)',
      '--sjs-general-forecolor-light': 'rgba(0, 0, 0, 0.6)',
      '--sjs-general-dim-forecolor': 'rgba(0, 0, 0, 0.91)',
      '--sjs-general-dim-forecolor-light': 'rgba(0, 0, 0, 0.6)',
      '--sjs-secondary-backcolor': 'rgba(255, 152, 20, 1)',
      '--sjs-secondary-backcolor-light': 'rgba(255, 152, 20, 0.1)',
      '--sjs-secondary-backcolor-semi-light': 'rgba(255, 152, 20, 0.25)',
      '--sjs-secondary-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-secondary-forecolor-light': 'rgba(255, 255, 255, 0.25)',
      '--sjs-shadow-small-reset': '0px 0px 0px 0px rgba(0, 0, 0, 0.2)',
      '--sjs-shadow-medium': '0px 2px 6px 0px rgba(0, 0, 0, 0.1)',
      '--sjs-shadow-large': '0px 8px 16px 0px rgba(0, 0, 0, 0.1)',
      '--sjs-shadow-inner-reset': '0px 0px 0px 0px rgba(0, 0, 0, 0.25)',
      '--sjs-border-inside': 'rgba(0, 0, 0, 0.16)',
      '--sjs-special-red-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-special-green': 'rgba(25, 179, 148, 1)',
      '--sjs-special-green-light': 'rgba(25, 179, 148, 0.1)',
      '--sjs-special-green-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-special-blue': 'rgba(67, 127, 217, 1)',
      '--sjs-special-blue-light': 'rgba(67, 127, 217, 0.1)',
      '--sjs-special-blue-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-special-yellow': 'rgba(255, 152, 20, 1)',
      '--sjs-special-yellow-light': 'rgba(255, 152, 20, 0.1)',
      '--sjs-special-yellow-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-article-font-xx-large-textDecoration': 'none',
      '--sjs-article-font-xx-large-fontWeight': '700',
      '--sjs-article-font-xx-large-fontStyle': 'normal',
      '--sjs-article-font-xx-large-fontStretch': 'normal',
      '--sjs-article-font-xx-large-letterSpacing': '0',
      '--sjs-article-font-xx-large-lineHeight': '64px',
      '--sjs-article-font-xx-large-paragraphIndent': '0px',
      '--sjs-article-font-xx-large-textCase': 'none',
      '--sjs-article-font-x-large-textDecoration': 'none',
      '--sjs-article-font-x-large-fontWeight': '700',
      '--sjs-article-font-x-large-fontStyle': 'normal',
      '--sjs-article-font-x-large-fontStretch': 'normal',
      '--sjs-article-font-x-large-letterSpacing': '0',
      '--sjs-article-font-x-large-lineHeight': '56px',
      '--sjs-article-font-x-large-paragraphIndent': '0px',
      '--sjs-article-font-x-large-textCase': 'none',
      '--sjs-article-font-large-textDecoration': 'none',
      '--sjs-article-font-large-fontWeight': '700',
      '--sjs-article-font-large-fontStyle': 'normal',
      '--sjs-article-font-large-fontStretch': 'normal',
      '--sjs-article-font-large-letterSpacing': '0',
      '--sjs-article-font-large-lineHeight': '40px',
      '--sjs-article-font-large-paragraphIndent': '0px',
      '--sjs-article-font-large-textCase': 'none',
      '--sjs-article-font-medium-textDecoration': 'none',
      '--sjs-article-font-medium-fontWeight': '700',
      '--sjs-article-font-medium-fontStyle': 'normal',
      '--sjs-article-font-medium-fontStretch': 'normal',
      '--sjs-article-font-medium-letterSpacing': '0',
      '--sjs-article-font-medium-lineHeight': '32px',
      '--sjs-article-font-medium-paragraphIndent': '0px',
      '--sjs-article-font-medium-textCase': 'none',
      '--sjs-article-font-default-textDecoration': 'none',
      '--sjs-article-font-default-fontWeight': '400',
      '--sjs-article-font-default-fontStyle': 'normal',
      '--sjs-article-font-default-fontStretch': 'normal',
      '--sjs-article-font-default-letterSpacing': '0',
      '--sjs-article-font-default-lineHeight': '28px',
      '--sjs-article-font-default-paragraphIndent': '0px',
      '--sjs-article-font-default-textCase': 'none',
      '--sjs-general-backcolor-dim': '#ffffff',
      '--sjs-primary-backcolor': '#AFA263',
      '--sjs-primary-backcolor-dark': 'rgba(160, 148, 91, 1)',
      '--sjs-primary-backcolor-light': 'rgba(175, 162, 99, 0.1)',
      '--sjs-primary-forecolor': 'rgba(255, 255, 255, 1)',
      '--sjs-primary-forecolor-light': 'rgba(255, 255, 255, 0.25)',
      '--sjs-special-red': 'rgba(175, 162, 99, 1)',
      '--sjs-special-red-light': 'rgba(175, 162, 99, 0.1)'
    },
    headerView: 'basic'
  });

  return survey;
}

// Function to get products based on the survey response
export function getProducts(surveyResponse: SurveyResponse): string[] {
  const { wirkstoffinder } = surveyResponse;
  const products = new Set<string>();

  wirkstoffinder.forEach((symptom: string) => {
    const normalizedSymptom = normalizeKey(symptom);
    for (const key in symptomToProductsMap) {
      if (normalizeKey(key) === normalizedSymptom) {
        const associatedProducts = symptomToProductsMap[key];
        associatedProducts?.forEach((product: string) => products.add(product));
      }
    }
  });

  return Array.from(products);
}
