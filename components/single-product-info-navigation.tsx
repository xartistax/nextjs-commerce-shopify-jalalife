import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Sticky from 'react-sticky-el/lib/basic-version';

const infoMenu = [
  {
    name: 'Qualität',
    url: '#qualitaet'
  },
  {
    name: 'Swiss Label',
    url: '#swiss_label'
  },
  {
    name: 'Wirkung',
    url: '#wirkung'
  },
  {
    name: 'Anwendung',
    url: '#anwendung'
  },
  {
    name: 'Zutaten',
    url: '#zutaten'
  },
  {
    name: 'Hinweise',
    url: '#hinweise'
  }
];

export default function InformationNavigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
  
      // Determine which section is currently in view
      const sections = infoMenu.map((item) => {
        const sectionElement = document.querySelector(item.url) as HTMLElement | null;
        return {
          id: item.url,
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
  // Run effect only on mount and unmount

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
        <ul className="mx-auto flex w-full max-w-screen-xl justify-center space-x-4 border-b-2 border-t-2 border-black">
          {infoMenu.map((item, i) => (
            <li key={i} className="flex-1">
              <Box
                component="a"
                href={item.url}
                onClick={handleClick}
                className={`block w-full rounded-md px-3 py-2 text-center text-sm font-bold uppercase `}
                sx={activeSection === item.url ? { color: 'primary.main' } : undefined}
              >
                {item.name}
              </Box>
            </li>
          ))}
        </ul>
      </nav>
    </Sticky>
  );
}
