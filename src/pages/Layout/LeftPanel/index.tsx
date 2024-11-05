import React from 'react';
import { NavItem } from 'src/components';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { globalOptions } from './LeftPanelData';

import './LeftPanel.scss';
import { ASH_GRAY } from 'src/constants/colors';

const LeftPanel: React.FC = () => {
  return (
    <Box className="leftPanel">
      <List sx={{ marginTop: '30px' }}>
        {globalOptions.map((op) => (
          <NavItem key={op.title} option={op} />
        ))}
      </List>
      <Box sx={{ padding: '25px 23px' }}>
        <Typography
          sx={{
            fontSize: '12px',
            lineHeight: '15px',
            fontWeight: 400,
            color: ASH_GRAY,
          }}
        >
          © {new Date().getFullYear()} ReGrowthWeb
        </Typography>
      </Box>
    </Box>
  );
};

export default LeftPanel;
