import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

import './RightPanel.scss';

import RightPanelFooter from './Footer';

const RightPanel: React.FC<PropsWithChildren> = ({ children }) => (
  <Box className="rightPanel">
    <Box sx={{ flexGrow: 1, paddingBottom: '26px' }}>{children}</Box>
    <RightPanelFooter />
  </Box>
);

export default RightPanel;
