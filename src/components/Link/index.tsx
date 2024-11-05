import React, { ReactNode } from 'react';
import { Link, LinkProps as RLinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { PRIMARY_BLUE } from 'src/constants/colors';

type LinkProps = {
  to: string;
  isUnderlined?: boolean;
  children?: ReactNode;
} & Omit<RLinkProps, 'to' | 'children'>;

const StyledLink = styled(Link)`
  color: ${PRIMARY_BLUE};
  font-weight: 500;
  font-size: 13px;
`;

export function LinkComponent({
  to,
  children,
  isUnderlined = true,
  ...rest
}: LinkProps) {
  return (
    <StyledLink
      to={to}
      sx={{ textDecoration: isUnderlined ? 'underlined' : 'none' }}
      {...rest}
    >
      {children}
    </StyledLink>
  );
}

export default LinkComponent;
