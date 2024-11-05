import React, { ReactNode } from 'react';
import { PRIMARY_BLUE, SAIL_BLUE } from 'src/constants/colors';
import Icon from 'src/components/Icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const styles = {
  display: 'flex',
  alignItems: 'center',
};

type TableErrorProps = {
  message?: ReactNode;
};

export const TableError = ({
  message = 'Sorry, there was a problem fetching the data. Please try again later.',
}: TableErrorProps) => {
  return (
    <Box>
      <Box
        sx={{
          ...styles,
          backgroundColor: SAIL_BLUE,
          padding: '14px',
          borderRadius: '7px',
          marginTop: '40px',
        }}
      >
        <Icon
          icon="exclamationCircle"
          size="18"
          cursor="pointer"
          fill={PRIMARY_BLUE}
          style={{ marginRight: '10px', fontWeight: 'bold' }}
        />
        <Typography
          className="text-slate-gray font-weight-medium"
          sx={{ fontSize: '14px', fontWeigth: '400' }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default TableError;
