export type SymptomToProductsMap = {
  [key: string]: string[];
};

export const symptomToProductsMap: SymptomToProductsMap = {
  schlafprobleme: ['ashwagandha-mit-zink-und-vitamin-b1'],
  stress: ['ashwagandha-mit-zink-und-vitamin-b1'],
  angstgefuehle: ['ashwagandha-mit-zink-und-vitamin-b1', 'curcuma-mit-zink'],
  pruefungsangst: ['ashwagandha-mit-zink-und-vitamin-b1'],
  energielosigkeit: ['ashwagandha-mit-zink-und-vitamin-b1', 'coenzym-q10-mit-vitamin-e'],
  muedigkeit: [
    'ashwagandha-mit-zink-und-vitamin-b1',
    'ingwer-mit-zink',
    'coenzym-q10-mit-vitamin-e'
  ],
  entzuendungen: ['indischer-weihrauch-mit-zink', 'curcuma-mit-zink', 'ingwer-mit-zink'],
  kopfschmerzen: ['ingwer-mit-zink', 'curcuma-mit-zink'],
  verdauungsprobleme: ['curcuma-mit-zink'],
  darmentzuendung: ['indischer-weihrauch-mit-zink', 'curcuma-mit-zink'],
  uebelkeit: ['ingwer-mit-zink'],
  menstruationsbeschwerden: ['ashwagandha-mit-zink-und-vitamin-b1']
};

export function normalizeKey(key: string): string {
  return key
    .toLowerCase()
    .normalize('NFD') // Decomposes combined letters (e.g., ü -> u + ̈)
    .replace(/[\u0300-\u036f]/g, ''); // Removes diacritical marks
}
