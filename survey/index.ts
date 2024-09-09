export const json = {
  locale: 'de',
  logoPosition: 'right',
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'tagbox',
          name: 'wirkstoffinder',
          title: 'Wählen Sie bis zu 3 Optionen aus',
          isRequired: true,
          requiredErrorText: {
            de: 'Sie müssen diese Frage beantworten'
          },
          choices: [
            {
              value: 'atemwege_abwehrkraefte',
              text: {
                default: 'Darmentzündungen',
                de: 'Atemwege und Abwehrkräfte'
              }
            },
            {
              value: 'energiestoffwechsel',
              text: {
                de: 'Energiestoffwechsel'
              }
            },
            {
              value: 'haut_haare',
              text: {
                de: 'Haut und Haare'
              }
            },
            {
              value: 'herz_muskeln',
              text: {
                de: 'Herz und Muskeln'
              }
            },
            {
              value: 'immunsystem',
              text: {
                de: 'Immunsystem'
              }
            },
            {
              value: 'knochen_gelenke',
              text: {
                de: 'Knochen und Gelenke'
              }
            },
            {
              value: 'nerven_gehirn',
              text: {
                de: 'Nerven und Gehirn'
              }
            },
            {
              value: 'regeneration',
              text: {
                de: 'Regeneration'
              }
            },
            {
              value: 'schilddruese',
              text: {
                de: 'Schilddrüse'
              }
            },
            {
              value: 'stressabbau_entspannung',
              text: {
                de: 'Stressabbau und Entspannung'
              }
            },
            {
              value: 'vitalitaet_widerstandskraft',
              text: {
                de: 'Vitalität und Widerstandskraft'
              }
            }
          ],
          maxSelectedChoices: 1,
          minSelectedChoices: 1,
          placeholder: 'Auswahl',
          hideSelectedItems: true
        }
      ]
    }
  ],
  showTitle: false,
  showPageTitles: false,
  showCompletedPage: false,
  showQuestionNumbers: 'off',
  pagePrevText: 'Zurück',
  pageNextText: 'Weiter',
  completeText: {
    default: 'Zeig mir mein Produkt',
    de: 'Zeig mir meine Produkte'
  },
  widthMode: 'responsive'
};
