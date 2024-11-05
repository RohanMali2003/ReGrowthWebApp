import React from 'react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system/styleFunctionSx';

interface ActionsContainerProps {
  onClick?: () => void;
  to?: string;
  sxBoxProps?: SxProps;
}

const boxProps: SxProps = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  marginLeft: '30px',
};

export const ActionsContainer = ({
  children,
  to,
  onClick,
  sxBoxProps,
}: PropsWithChildren<ActionsContainerProps>) => {
  if (onClick) {
    return (
      <Box sx={{ ...boxProps, ...sxBoxProps }} onClick={onClick}>
        {children}
      </Box>
    );
  }

  if (to) {
    return (
      <Link to={to} className="text-decoration-none">
        <Box sx={{ ...boxProps, ...sxBoxProps }}>{children}</Box>
      </Link>
    );
  }

  return null;
};

export default ActionsContainer;
