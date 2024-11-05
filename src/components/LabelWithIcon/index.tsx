import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { Icon, IconMappingKeys } from 'src/components';
import { PRIMARY_BLUE } from 'src/constants/colors';

type IconProps = {
  iconType: IconMappingKeys;
  label: string;
};

const BoxWithLabel: React.FC<PropsWithChildren> = ({ children }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
    }}
  >
    {children}
  </Box>
);

export const LabelWithIcon = ({ iconType, label }: IconProps) => (
  <BoxWithLabel>
    <Icon
      icon={iconType}
      size="20"
      fill={PRIMARY_BLUE}
      style={{ lineHeight: '18px', margin: '0 7.5px' }}
      cursor="pointer"
    />
    {label}
  </BoxWithLabel>
);
