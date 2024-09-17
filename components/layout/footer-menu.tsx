import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';

const FooterMenuItem = ({ item }: { item: Menu }) => {
  return (
    <li>
      <Link
        href={`${item.path}`}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm ',
          {
            'text-black': 'active'
          }
        )}
      >
        <Typography variant="caption">{item.title}</Typography>
      </Link>
    </li>
  );
};

export default function FooterMenu({
  mainMenu,
  gutGegenMenu,
  legalMenu
}: {
  mainMenu: Menu[];
  gutGegenMenu: Menu[];
  legalMenu: Menu[];
}) {
  return (
    <nav className="grid w-full grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-4">
      <ul>
        <Typography gutterBottom component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
          Gut für
        </Typography>
        {gutGegenMenu.map((item: Menu) => (
          <FooterMenuItem key={item.title} item={item} />
        ))}
      </ul>
      <ul>
        <Typography gutterBottom component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
          Shop
        </Typography>
        {mainMenu.map((item: Menu) => (
          <FooterMenuItem key={item.title} item={item} />
        ))}
      </ul>
      <Box component={'ul'} sx={{ margin: '0', padding: '0' }}>
        <Typography gutterBottom component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
          Jala-Life
        </Typography>
        {legalMenu.map((item: Menu) => (
          <FooterMenuItem key={item.title} item={item} />
        ))}
      </Box>
      <Box component={'div'}>
        <Typography gutterBottom component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
          Informationen
        </Typography>

        <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
          <Typography gutterBottom variant="caption">
            SoluVeda GmbH <br />
            Turmstrasse 11 <br />
            DE- 78467, Konstanz <br />
            <Box component={'a'} sx={{ color: 'primary.main' }} href="mailto:info@jala-life.com">
              info@jala-life.com
            </Box>{' '}
            <br />
            <Box component={'a'} sx={{ color: 'primary.main' }} href="tel:+49 7531 58 47 850">
              Tel: +49 7531 58 47 850
            </Box>
          </Typography>
        </Box>

        <Box sx={{ marginBottom: '2rem', marginTop: '1rem' }}>
          <Typography gutterBottom component="p" sx={{ fontWeight: 'bold' }}>
            Für Kunden aus der Schweiz und Lichtenstein
          </Typography>
          <Typography gutterBottom variant="caption">
            CannSol Distribution AG <br />
            Industriestrasse 46 <br />
            LI-9491 Ruggell <br />
            <Box component={'a'} sx={{ color: 'primary.main' }} href="mailto:info@jala-life.com">
              info@jala-life.com
            </Box>{' '}
            <br />
            <Box component={'a'} sx={{ color: 'primary.main' }} href="tel:+423 237 70 72">
              Tel.: +423 237 70 72
            </Box>
          </Typography>
        </Box>
      </Box>
    </nav>
  );
}
