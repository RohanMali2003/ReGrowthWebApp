import React, { useState } from 'react';
import { NavItem } from 'src/components';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { globalOptions } from './LeftPanelData';

import './LeftPanel.scss';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const LeftPanel: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togglePanel = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box className={`leftPanel ${isCollapsed ? 'collapsed' : ''}`}>    
      <List>
        {globalOptions.map((item) => (
          <NavItem key={item.title} option={item} />
        ))}
      </List>
      <button
        className="toggle-icon"
        onClick={togglePanel}
        aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
      >
        {isCollapsed ? <FiChevronsRight size="24px" /> : <FiChevronsLeft size="24px" />}
      </button>  
    </Box>
  );
};

export default LeftPanel;
