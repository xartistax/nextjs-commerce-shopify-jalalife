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
              value: 'darmentzuendung',
              text: 'Darmentzündungen'
            },
            {
              value: 'schlafprobleme',
              text: 'Schlafprobleme'
            },
            {
              value: 'entzuendungen',
              text: 'Entzündungen'
            },
            {
              value: 'stress',
              text: 'Stress'
            },
            {
              value: 'muedigkeit',
              text: 'Müdigkeit'
            },
            {
              value: 'pruefungsangst',
              text: 'Prüfungsangst'
            },
            {
              value: 'angstgefuehle',
              text: 'Angstgefühle'
            },
            {
              value: 'uebelkeit',
              text: 'Übelkeit'
            },
            {
              value: 'energielosigkeit',
              text: 'Energielosigkeit'
            },
            {
              value: 'verdauungsprobleme',
              text: 'Verdauungsprobleme'
            },
            {
              value: 'kopfschmerzen',
              text: 'Kopfschmerzen'
            },
            {
              value: 'menstruationsbeschwerden',
              text: 'Menstruationsbeschwerden'
            }
          ],
          maxSelectedChoices: 3,
          minSelectedChoices: 1,
          placeholder: 'Auswahl',
          hideSelectedItems: true
        }
      ]
    },
    {
      name: 'page2',
      elements: [
        {
          type: 'dropdown',
          name: 'gender',
          title: 'Ich bin ...',
          isRequired: true,
          requiredErrorText: {
            de: 'Sie müssen diese Frage beantworten'
          },
          choices: [
            {
              value: 'maennlich',
              text: 'Männlich'
            },
            {
              value: 'weiblich',
              text: 'Weiblich'
            }
          ],
          autocomplete: 'sex'
        },
        {
          type: 'text',
          name: 'lastname',
          title: 'Nachname',
          isRequired: true,
          requiredErrorText: {
            de: 'Sie müssen diese Frage beantworten'
          },
          autocomplete: 'family-name',
          placeholder: {
            de: 'Nachname'
          }
        },
        {
          type: 'text',
          name: 'name',
          title: 'Vorname',
          isRequired: true,
          requiredErrorText: {
            de: 'Sie müssen diese Frage beantworten'
          },
          autocomplete: 'name',
          placeholder: {
            de: 'Vorname'
          }
        },
        {
          type: 'text',
          name: 'email',
          title: 'E-Mail Adresse',
          isRequired: true,
          requiredErrorText: {
            de: 'Sie müssen diese Frage beantworten'
          },
          inputType: 'email',
          autocomplete: 'email',
          placeholder: {
            de: 'E-Mail Adresse'
          }
        },
        {
          type: 'text',
          name: 'phone',
          title: 'Telefonnummer',
          isRequired: true,
          requiredErrorText: {
            de: 'Sie müssen diese Frage beantworten'
          },
          inputType: 'tel',
          autocomplete: 'tel',
          placeholder: {
            de: 'Telefonnummer'
          }
        }
      ]
    }
  ],
  showTitle: false,
  showPageTitles: false,
  showQuestionNumbers: 'off',
  pagePrevText: 'Zurück',
  pageNextText: 'Weiter',
  completeText: 'Zeig mir mein Produkt',
  widthMode: 'responsive'
};
