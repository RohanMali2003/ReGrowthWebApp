import '@mui/material/styles';

// Specify that we're extending Typography variants for mui
declare module '@mui/material/styles' {
  interface TypographyVariants {
    appBlack: React.CSSProperties;
    auroMetal: React.CSSProperties;
    primary: React.CSSProperties;
    secondary: React.CSSProperties;
    disabled: React.CSSProperties;
    error: React.CSSProperties;
    success: React.CSSProperties;
    warning: React.CSSProperties;
    warningOrange: React.CSSProperties;
    gray34: React.CSSProperties;
    primaryBlue: React.CSSProperties;
    info: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    appBlack?: React.CSSProperties;
    primary?: React.CSSProperties;
    secondary?: React.CSSProperties;
    disabled?: React.CSSProperties;
    error?: React.CSSProperties;
    success?: React.CSSProperties;
    warning?: React.CSSProperties;
    warningOrange?: React.CSSProperties;
    gray34?: React.CSSProperties;
    auroMetal?: React.CSSProperties;
    primaryBlue?: React.CSSProperties;
    info?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    appBlack: true;
    primary: true;
    secondary: true;
    disabled: true;
    error: true;
    success: true;
    warning: true;
    warningOrange: true;
    gray34: true;
    auroMetal: true;
    primaryBlue: true;
    info: true;
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsVariantOverrides {
    normal: true;
  }
}
