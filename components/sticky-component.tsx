'use client';

import Sticky from 'react-sticky-el/lib/basic-version';

const StickyBox = ({ children }: { children: React.ReactNode }) => {
  return <Sticky>{children}</Sticky>;
};

export default StickyBox;
