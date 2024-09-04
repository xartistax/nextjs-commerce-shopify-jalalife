'use client';

import { Box } from '@mui/material';
import Sticky from 'react-sticky-el/lib/basic-version';

const StickyBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box component={'div'} className="scrollarea" sx={{ height: '100%' }}>
      <Sticky boundaryElement=".scrollarea" hideOnBoundaryHit={false}>
        {children}
      </Sticky>
    </Box>
  );
};

export default StickyBox;
