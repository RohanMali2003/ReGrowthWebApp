import React, { PropsWithChildren } from 'react';
import { BLACK } from 'src/constants/colors';
import Typography from '@mui/material/Typography';

export const PageTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <Typography
    sx={{
      fontSize: '30px',
      fontWeight: 700,
      lineHeight: '36px',
      textTransform: 'uppercase',
      color: BLACK,
    }}
  >
    {children}
  </Typography>
);

export default PageTitle;
