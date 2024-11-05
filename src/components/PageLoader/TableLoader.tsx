import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function TableLoader() {
  return (
    <Skeleton
      animation="wave"
      height="18rem"
      sx={{ transform: 'none', transformOrigin: 'none' }}
    />
  );
}
