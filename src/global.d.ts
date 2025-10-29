import '@mui/material/styles';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    inApp: true;
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    inApp: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      [key: string]: string;
    };
  }
  interface ThemeOptions {
    colors?: {
      [key: string]: string;
    };
  }
}
