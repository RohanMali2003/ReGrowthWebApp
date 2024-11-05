import React from 'react';
import { lightBlue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import {
  AURO_METAL,
  BLACK,
  ERROR_RED,
  GRAY34,
  PRIMARY_BLUE,
  ROMAN_SILVER,
  SAIL_BLUE,
  SUCCESS_GREEN,
  TEXT_DISABLED,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  WARNING_ORANGE,
  WARNING_YELLOW,
  WHITE,
} from 'src/constants/colors';

const commonTextStyle: React.CSSProperties = {
  lineHeight: '22px',
  fontSize: '13px',
  letterSpacing: '-0.02rem',
};

export const baseTheme = createTheme({
  components: {
    MuiAlert: {
      variants: [
        {
          props: { variant: 'standard' },
          style: {
            background: SAIL_BLUE,
            color: lightBlue['300'],
            borderRadius: '4px',
          },
        },
      ],
    },
    MuiStep: {
      styleOverrides: {
        root: {
          ':first-of-type': {
            paddingLeft: 0,
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderTopWidth: '2px',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Inter',
    body1: {
      color: BLACK,
      fontSize: '13px',
    },
    body2: {
      color: ROMAN_SILVER,
      fontSize: '13px',
    },
    auroMetal: {
      color: AURO_METAL,
      fontSize: '13px',
    },
    appBlack: {
      color: BLACK,
    },
    primary: {
      ...commonTextStyle,
      color: TEXT_PRIMARY,
      fontWeight: 500,
    },
    primaryBlue: {
      ...commonTextStyle,
      color: PRIMARY_BLUE,
      fontWeight: 400,
    },
    secondary: {
      ...commonTextStyle,
      color: TEXT_SECONDARY,
    },
    disabled: {
      ...commonTextStyle,
      color: TEXT_DISABLED,
    },
    error: {
      color: ERROR_RED,
    },
    success: {
      color: SUCCESS_GREEN,
    },
    warning: {
      color: WARNING_YELLOW,
    },
    info: {
      color: PRIMARY_BLUE,
    },
    warningOrange: {
      color: WARNING_ORANGE,
    },
    gray34: {
      color: GRAY34,
    },
  },
  palette: {
    primary: {
      main: PRIMARY_BLUE, // Button background
      light: WHITE,
      contrastText: WHITE, // Button text
    },
    // Somehow success doesn't get overwritten when using on Typography
    // We can use sx for now
    success: {
      main: SUCCESS_GREEN,
    },
    warning: {
      main: WARNING_ORANGE,
    },
    error: {
      main: ERROR_RED,
    },
  },
});

export default baseTheme;
