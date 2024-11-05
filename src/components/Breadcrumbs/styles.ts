import { SxProps } from '@mui/system/styleFunctionSx';

import { TEXT_DISABLED, TEXT_PRIMARY } from 'src/constants/colors';

export const breadcrumbsWrapper: SxProps = {
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
};

export const breadcrumbsLinkItem: SxProps = {
  color: TEXT_PRIMARY,
  cursor: 'pointer',
  textDecoration: 'none',
  letterSpacing: '0.15px',

  '&:hover': {
    textDecoration: 'underline',
  },
};

export const breadcrumbsDisabledLinkItem: SxProps = {
  color: TEXT_DISABLED,
  cursor: 'default',
  textDecoration: 'none',
  letterSpacing: '0.15px',
};
