import React from 'react';
import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export const Button: React.FC<MUIButtonProps> = ({ sx, children, ...rest }) => (
  <MUIButton
    sx={{
      height: '40px',
      borderRadius: '4px',
      textTransform: 'capitalize',
      boxShadow: 'none',
      fontWeight: 500,
      fontSize: '15px',
      lineHeight: '26px',
      ...sx,
    }}
    {...rest}
  >
    {children}
  </MUIButton>
);

export default Button;
