import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system/styleFunctionSx';

import InfoFieldText from './InfoFieldText';

type InfoFieldProps = {
  label: string;
  value?: string | JSX.Element | string[];
  to?: string | string[];
  labelSx?: SxProps;
} & BoxProps;

export const InfoField = ({
  label,
  value = '-',
  to,
  ...rest
}: InfoFieldProps) => (
  <Box display="flex" flexDirection="column" flexBasis="25%" {...rest}>
    <Typography variant="subtitle2">{label}</Typography>
    <InfoFieldText to={to} value={value} />
  </Box>
);

export default InfoField;
