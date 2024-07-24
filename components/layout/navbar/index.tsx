import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
const {  SHOPIFY_STORE_DOMAIN } = process.env;

export default async function Navbar() {
  const menugutgegen = await getMenu('gutgegenmenu');
  const menu = await getMenu('hotmenu');
  const legal = await getMenu('footer');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        <div className="flex w-1/3">
          <Suspense fallback={null}>
            {<MobileMenu menu={menugutgegen} mainMenu={menu} legalMenu={legal} />}
          </Suspense>
        </div>
        <div className="w-1/3 justify-center md:flex">
          <Link
            href={`https://${SHOPIFY_STORE_DOMAIN}`}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
         

         {/* <Image
                src={'/logo_schwarz_full.png'}
                alt={`${SITE_NAME}`}
                width={50}
                height={50}
                style={{ width: '50px', height: 'auto' }}
              /> */}

           
          </Link>
        </div>
        <div className="flex w-1/3 justify-end">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
