'use client';
import { Box, Typography } from '@mui/material';
import { identifiers } from 'lib/utils';
import { useEffect, useState } from 'react';
import Sticky from 'react-sticky-el/lib/basic-version';

export default function InformationNavigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Determine which section is currently in view
      const sections = identifiers.map((item) => {
        const sectionElement = document.querySelector(`#${item.key}`) as HTMLElement | null;
        return {
          id: `#${item.key}`,
          offsetTop: sectionElement ? sectionElement.offsetTop - 100 : 0,
          offsetHeight: sectionElement ? sectionElement.offsetHeight : 0
        };
      });

      const currentSection = sections.find(
        (section) =>
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
      );

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href');
    if (url) {
      const targetElement = document.querySelector(url) as HTMLElement;
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <Sticky>
      <nav className="bg-neutral-50 py-4">
        <ul className="border-b-1 border-t-1 mx-auto flex w-full max-w-screen-xl flex-wrap justify-center space-x-4 border-black">
          {identifiers.map((item, i) => (
            <li key={i} className="flex-1 sm:flex-none">
              <Box
                component="a"
                href={`#${item.key}`}
                onClick={handleClick}
                className={`block w-full rounded-md px-3 py-2 text-center text-sm font-bold uppercase`}
                sx={{
                  color: activeSection === `#${item.key}` ? 'primary.main' : undefined,
                  flexBasis: '100%', // Ensure each item takes full width on small screens
                  '@media (min-width: 600px)': {
                    flexBasis: 'auto' // Revert to auto width on larger screens
                  }
                }}
              >
                <Typography sx={{ fontWeight: 900 }}>{item.fullName}</Typography>
              </Box>
            </li>
          ))}
        </ul>
      </nav>
    </Sticky>
  );
}
