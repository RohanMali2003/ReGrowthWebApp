import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

import './Layout.scss';
import Header from './Header';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flexGrow: '1', display: 'flex', overflow: 'hidden' }}>
      <LeftPanel />
      <Box sx={{ flexGrow: '1', overflowY: 'auto' }}>
        <RightPanel>{children}</RightPanel>
      </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
