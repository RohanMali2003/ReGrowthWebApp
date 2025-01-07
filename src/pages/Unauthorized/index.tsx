import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import '../Layout/Layout.scss';
import Header from '../Layout/Header';
import LeftPanel from '../Layout/LeftPanel';
import RightPanel from '../Layout/RightPanel';

// Import the image
import unauthorizedImage from '../../assets/images/unauthorized.jpg';

const Unauthorized: React.FC<PropsWithChildren> = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flexGrow: '1', display: 'flex', overflow: 'hidden' }}>
        <LeftPanel />
        <Box sx={{ flexGrow: '1', overflowY: 'auto', textAlign: 'center', padding: '20px' }}>
          <RightPanel>
            <div>
              <img src={unauthorizedImage} alt="Unauthorized Access" style={{ maxWidth: '100%', height: 'auto', margin: '20px 0' }} />
            </div>
          </RightPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Unauthorized;
