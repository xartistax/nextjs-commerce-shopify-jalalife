export type SymptomToCollectionMap = {
  [key: string]: string[];
};

export const symptomToCollectionMap: SymptomToCollectionMap = {
  atemwege_abwehrkraefte: ['atemwege-und-abwehrkrafte'],
  energiestoffwechsel: ['energiestoffwechsel'],
  haut_haare: ['haut-und-haare'],
  herz_muskeln: ['herz-und-muskeln'],
  energielosigkeit: ['energielosigkeit'],
  immunsystem: ['immunsystem'],
  knochen_gelenke: ['knochen-und-gelenke'],
  nerven_gehirn: ['nerven-und-gehirn'],
  regeneration: ['regeneration'],
  schilddruese: ['schilddruse'],
  stressabbau_entspannung: ['stressabbau-und-entspannung'],
  vitalitaet_widerstandskraft: ['vitalitat-und-widerstandskraft']
};

export function normalizeKey(key: string): string {
  return key
    .toLowerCase()
    .normalize('NFD') // Decomposes combined letters (e.g., ü -> u + ̈)
    .replace(/[\u0300-\u036f]/g, ''); // Removes diacritical marks
}
