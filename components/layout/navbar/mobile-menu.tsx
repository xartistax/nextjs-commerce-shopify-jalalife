'use client';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { Backdrop, Box, Grid, Link, Typography } from '@mui/material';
import NewsLetter from 'components/newsletter';
import Sendungsverfolgung from 'components/sendungsverfolgung';
import { Menu } from 'lib/shopify/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

export default function MobileMenu({
  menu,
  mainMenu,
  legalMenu,
  promoMenu
}: {
  menu: Menu[];
  mainMenu: Menu[];
  legalMenu: Menu[];
  promoMenu: Menu[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [bdopen, setBdOpen] = useState(false);
  const [bdopen2, setBdOpen2] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const openMobileMenu = () => setIsOpen(true); // Toggle to open the menu
  const closeMobileMenu = () => setIsOpen(false);

  const handleBDClose = () => {
    setBdOpen(false);
    setShowPlayer(false);
  };
  const handleBDOpen = () => {
    setShowPlayer(true);
    setBdOpen(true);
  };

  const handleBDClose2 = () => {
    setBdOpen2(false);
    setShowPlayer(false);
  };
  const handleBDOpen2 = () => {
    setShowPlayer(true);
    setBdOpen2(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className={`flex items-center justify-center rounded-md transition-colors ${'text-black'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44.819"
          height="20.513"
          viewBox="0 0 44.819 20.513"
        >
          <g id="Group_1564" data-name="Group 1564" transform="translate(1 1)">
            <g id="Group_1199" data-name="Group 1199" transform="translate(0 0)">
              <line
                id="Line_1"
                data-name="Line 1"
                x2="42.819"
                transform="translate(0 0)"
                fill="none"
                stroke={'#000'}
                strokeLinecap="round"
                strokeWidth="2"
              ></line>
              <line
                id="Line_2"
                data-name="Line 2"
                x2="42.819"
                transform="translate(0 8.77)"
                fill="none"
                stroke={'#000'}
                strokeLinecap="round"
                strokeWidth="2"
              ></line>
              <line
                id="Line_3"
                data-name="Line 3"
                x2="42.819"
                transform="translate(0 18.513)"
                fill="none"
                stroke={'#000'}
                strokeLinecap="round"
                strokeWidth="2"
              ></line>
            </g>
          </g>
        </svg>
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className=" fixed bottom-0 left-0 right-0 top-0 flex h-auto w-full flex-col overflow-y-scroll bg-white pb-6">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full md:hidden"></div>

                <Grid container spacing={2} paddingTop={5}>
                  <Grid item md={3} xs={12}>
                    {menu.length ? (
                      <Box component="ul" className="flex w-full flex-col">
                        <Typography
                          gutterBottom
                          component="h3"
                          variant="h5"
                          sx={{ fontWeight: 'bold' }}
                        >
                          Gut für
                        </Typography>

                        {menu.map((item) => (
                          <Box
                            component="li"
                            key={item.path}
                            sx={{ textDecoration: 'none' }}
                            className="py-1 text-lg text-black transition-colors hover:text-neutral-500"
                          >
                            <Link
                              href={item.path}
                              onClick={closeMobileMenu}
                              sx={{ textDecoration: 'none' }}
                              color="inherit"
                            >
                              <Typography fontSize={'1rem'}>{item.title}</Typography>
                            </Link>
                            {item.items && item.items.length > 0 && (
                              <Box component="ul" className="pl-4">
                                {item.items.map((subItem) => (
                                  <Box
                                    component="li"
                                    key={subItem.title}
                                    className="py-2 text-lg text-gray-700 hover:text-gray-900"
                                  >
                                    <Link
                                      href={subItem.path}
                                      onClick={closeMobileMenu}
                                      color="inherit"
                                    >
                                      {subItem.title}
                                    </Link>
                                    {/* Recursive call for deeper submenus */}
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Box>
                        ))}

                        <Typography
                          gutterBottom
                          component="h3"
                          variant="h5"
                          sx={{ fontWeight: 'bold', paddingTop: '2rem' }}
                        >
                          Angebote
                        </Typography>

                        {promoMenu.map((item) => (
                          <Box
                            component="li"
                            key={item.path}
                            sx={{ textDecoration: 'none' }}
                            className="py-1 text-lg text-black transition-colors hover:text-neutral-500"
                          >
                            <Link
                              href={item.path}
                              onClick={closeMobileMenu}
                              sx={{ textDecoration: 'none' }}
                              color="inherit"
                            >
                              <Typography fontSize={'1rem'}>{item.title}</Typography>
                            </Link>
                            {item.items && item.items.length > 0 && (
                              <Box component="ul" className="pl-4">
                                {item.items.map((subItem) => (
                                  <Box
                                    component="li"
                                    key={subItem.title}
                                    className="py-2 text-lg text-gray-700 hover:text-gray-900"
                                  >
                                    <Link
                                      href={subItem.path}
                                      onClick={closeMobileMenu}
                                      color="inherit"
                                    >
                                      {subItem.title}
                                    </Link>
                                    {/* Recursive call for deeper submenus */}
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                    ) : null}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Typography
                      gutterBottom
                      component="h3"
                      variant="h5"
                      sx={{ fontWeight: 'bold' }}
                    >
                      JalaLife
                    </Typography>

                    {mainMenu.map((item) => (
                      <Box
                        component="li"
                        key={item.title}
                        className="list-none py-1 text-lg text-black transition-colors hover:text-neutral-500"
                      >
                        <Link
                          href={`${item.path}`}
                          onClick={closeMobileMenu}
                          sx={{ textDecoration: 'none' }}
                          color="inherit"
                        >
                          <Typography fontSize={'1rem'}>{item.title}</Typography>
                        </Link>
                        {item.items && item.items.length > 0 && (
                          <Box component="ul" className="pl-4">
                            {item.items.map((subItem) => (
                              <Box
                                component="li"
                                key={subItem.title}
                                className="py-2 text-lg text-gray-700 hover:text-gray-900"
                              >
                                <Link href={subItem.path} onClick={closeMobileMenu} color="inherit">
                                  {subItem.title}
                                </Link>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}

                    <Typography
                      gutterBottom
                      component="p"
                      sx={{ fontWeight: 'bold', paddingTop: '1rem' }}
                    >
                      Erklärungsvideos
                    </Typography>
                    <Box component="li" className="list-none text-lg ">
                      <Link
                        href={'#'}
                        color="inherit"
                        className="transition-colors hover:text-neutral-500"
                      >
                        <Typography fontSize={'1rem'} onClick={handleBDOpen}>
                          <SmartDisplayIcon color="primary"></SmartDisplayIcon> Was tun bei
                          verstopften Pippetten?
                        </Typography>
                      </Link>

                      <Link
                        href={'#'}
                        color="inherit"
                        className="transition-colors hover:text-neutral-500"
                      >
                        <Typography fontSize={'1rem'} onClick={handleBDOpen2}>
                          <SmartDisplayIcon color="primary"> </SmartDisplayIcon> Was ist JalaLife
                        </Typography>
                      </Link>
                    </Box>

                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={bdopen}
                      onClick={handleBDClose}
                    >
                      {showPlayer && (
                        <ReactPlayer
                          url="https://jala-life.com/cdn/shop/videos/c/vp/654c78ece1bc466ab113d99dfbc96a48/654c78ece1bc466ab113d99dfbc96a48.SD-480p-0.9Mbps-16041576.mp4?v=0"
                          controls={true}
                        />
                      )}
                    </Backdrop>

                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={bdopen2}
                      onClick={handleBDClose2}
                    >
                      {showPlayer && (
                        <ReactPlayer
                          url="https://www.youtube.com/watch?v=QA70CuT0PSE"
                          controls={true}
                        />
                      )}
                    </Backdrop>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Typography
                      gutterBottom
                      component="h3"
                      variant="h5"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Wichtig
                    </Typography>

                    {legalMenu.map((item) => (
                      <Box
                        component="li"
                        key={item.path}
                        className="list-none py-1 text-lg text-black transition-colors hover:text-neutral-500"
                      >
                        <Link
                          href={`${item.path}`}
                          onClick={closeMobileMenu}
                          sx={{ textDecoration: 'none' }}
                          color="inherit"
                        >
                          <Typography fontSize={'1rem'}>{item.title}</Typography>
                        </Link>
                        {item.items && item.items.length > 0 && (
                          <Box component="ul" className="pl-4">
                            {item.items.map((subItem) => (
                              <Box
                                component="li"
                                key={subItem.title}
                                className="py-2 text-lg text-gray-700 hover:text-gray-900"
                              >
                                <Link href={subItem.path} onClick={closeMobileMenu} color="inherit">
                                  {subItem.title}
                                </Link>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}

                    <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
                      <Typography gutterBottom component="p" sx={{ fontWeight: 'bold' }}>
                        Verfolgen Sie Ihre Sendung
                      </Typography>

                      <Sendungsverfolgung />
                    </Box>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Typography
                      gutterBottom
                      component="h3"
                      variant="h5"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Informationen
                    </Typography>

                    <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
                      <Typography gutterBottom component="p">
                        SoluVeda GmbH <br />
                        Turmstrasse 11 <br />
                        DE- 78467, Konstanz <br />
                        <Box
                          component={'a'}
                          sx={{ color: 'primary.main' }}
                          href="mailto:info@jala-life.com"
                        >
                          info@jala-life.com
                        </Box>{' '}
                        <br />
                        <Box
                          component={'a'}
                          sx={{ color: 'primary.main' }}
                          href="tel:+49 7531 58 47 850"
                        >
                          Tel: +49 7531 58 47 850
                        </Box>
                      </Typography>
                    </Box>

                    <Box sx={{ marginBottom: '2rem', marginTop: '1rem' }}>
                      <Typography gutterBottom component="p" sx={{ fontWeight: 'bold' }}>
                        Für Kunden aus der Schweiz und Lichtenstein
                      </Typography>
                      <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
                        <Typography gutterBottom component="p">
                          CannSol Distribution AG <br />
                          Industriestrasse 46 <br />
                          LI-9491 Ruggell <br />
                          <Box
                            component={'a'}
                            sx={{ color: 'primary.main' }}
                            href="mailto:info@jala-life.com"
                          >
                            info@jala-life.com
                          </Box>{' '}
                          <br />
                          <Box
                            component={'a'}
                            sx={{ color: 'primary.main' }}
                            href="tel:+423 237 70 72"
                          >
                            Tel.: +423 237 70 72
                          </Box>
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography gutterBottom component="p" sx={{ fontWeight: 'bold' }}>
                        Melden Sie sich an für unseren Newsletter
                      </Typography>

                      <NewsLetter />
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
