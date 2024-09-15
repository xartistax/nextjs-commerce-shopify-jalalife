import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { getMenu } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menugutgegen = await getMenu('gutgegenmenu');
  const menu = await getMenu('hotmenu');
  const legal = await getMenu('footer');

  return (
    <nav className="relative flex items-center justify-between bg-white p-4 lg:px-6">
      <div className="flex w-full items-center">
        <div className="flex w-1/3">
          <Suspense fallback={<div>Loading...</div>}>
            <MobileMenu menu={menugutgegen} mainMenu={menu} legalMenu={legal} />
          </Suspense>
        </div>
        <div className="flex w-1/3 justify-center md:justify-center">
          <Link href={`https://www.jala-life.com`} className="flex items-center justify-center">
            <Image
              src={'/logo_schwarz_full.webp'}
              alt={`${SITE_NAME}`}
              width={50}
              height={50}
              style={{ width: '50px', height: '50px' }} // Ensure dimensions are consistent
              priority // Optional: Load image early if critical
            />
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
