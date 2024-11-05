import React from 'react';
import { BLUE_MATISSE, PRIMARY_BLUE, SAIL_BLUE } from 'src/constants/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from 'src/components/Icon';

const styles = {
  position: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
};

export const AppError: React.FC = () => (
  <Box
    sx={{
      ...styles.position,
      height: '100vh',
    }}
  >
    <Box
      sx={{
        ...styles.position,
        height: '260px',
        width: '450px',
        backgroundColor: SAIL_BLUE,
        padding: '0px 40px',
      }}
    >
      <Icon
        icon="exclamationCircle"
        size="42"
        fill={PRIMARY_BLUE}
        style={{ marginRight: '5px' }}
      />
      <Typography
        style={{
          color: BLUE_MATISSE,
          marginTop: '10px',
          fontWeight: '400',
          fontSize: '20px',
        }}
      >
        <div>Sorry, an unexpected error</div>
        <div style={{ textAlign: 'center' }}>has occurred.</div>
      </Typography>
    </Box>
  </Box>
);

export default AppError;
