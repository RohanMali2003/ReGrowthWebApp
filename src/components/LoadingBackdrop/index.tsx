import React from 'react';
import { PRIMARY_BLUE } from 'src/constants/colors';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type LoadingBackdropProps = {
  loading?: boolean;
};

export const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
  loading = false,
}) => (
  <Backdrop
    sx={{ color: PRIMARY_BLUE, zIndex: 3, marginTop: '0px !important' }}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default LoadingBackdrop;
