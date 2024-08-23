import { Typography } from '@mui/material';
import { getMenu } from 'lib/shopify';
import FooterMenu from './footer-menu';

// const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  // const currentYear = new Date().getFullYear();
  // const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  // const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';

  // const copyrightName = COMPANY_NAME || SITE_NAME || '';

  const menu = await getMenu('hotmenu');
  const menugutgegen = await getMenu('gutgegenmenu');
  const menulegal = await getMenu('footer');

  return (
    <footer className="mt-32 text-sm">
      <div className="mx-auto flex w-full max-w-7xl gap-6 border-t  border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <FooterMenu mainMenu={menu} gutGegenMenu={menugutgegen} legalMenu={menulegal} />
      </div>
      <div className="mx-auto  block w-full max-w-7xl gap-6 border-t border-neutral-200  px-6 py-12 text-center text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <Typography variant="overline" display="block" gutterBottom>
          Made with ❤️ in 🇨🇭 by Bexolutions GmbH, Your Partner for Success – Digital Marketing ,
          Business Development, Websites, Social Media & Videos.
        </Typography>
      </div>
    </footer>
  );
}
