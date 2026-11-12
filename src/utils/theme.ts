const themeStyle = require('../../content/data/style.json');
import { createTheme } from '@mui/material/styles';
import { sans } from './font';

const dividerColor = 'rgba(2, 0, 29, 0.08)';

const theme = createTheme({
  palette: {
    mode: themeStyle.mode ?? 'light',
    primary: {
      main: themeStyle.primaryColor ?? '#4C57C5'
    },
    secondary: {
      main: themeStyle.secondaryColor ?? '#10B981'
    },
    text: {
      primary: themeStyle.mode === 'dark' ? '#fff' : '#02001d',
      secondary: themeStyle.mode === 'dark' ? '#979797' : '#374151'
    },
    background: {
      default: '#F3F4F6',
      paper: themeStyle.colors.white ?? '#FFFFFF'
    },
    divider: dividerColor
  },
  colors: Object.keys(themeStyle.colors).reduce(
    (acc, key) => ({ ...acc, [key]: themeStyle.colors[key] }),
    {}
  ),
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: sans.style.fontFamily,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: '3.5rem',
      fontWeight: 600,
      letterSpacing: '-0.045em',
      lineHeight: 1.05
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      letterSpacing: '-0.04em',
      lineHeight: 1.12
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.2
    },
    h4: {
      fontSize: '1.375rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      lineHeight: 1.3
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.4
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '-0.02em',
      lineHeight: 1.45
    },
    subtitle2: {
      fontSize: '0.9375rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1.0625rem',
      fontWeight: 400,
      letterSpacing: '-0.011em',
      lineHeight: 1.7
    },
    body2: {
      fontSize: '0.9375rem',
      fontWeight: 400,
      letterSpacing: '-0.006em',
      lineHeight: 1.6
    },
    button: {
      fontSize: '0.9375rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
      textTransform: 'none'
    },
    caption: {
      fontSize: '0.8125rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
      lineHeight: 1.5
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      lineHeight: 1.5,
      textTransform: 'uppercase'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F3F4F6',
          fontFamily: sans.style.fontFamily,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: '0.875rem',
          borderRadius: 8,
          minHeight: 36,
          padding: '8px 16px'
        },
        sizeLarge: {
          fontSize: '0.875rem',
          minHeight: 40,
          padding: '8px 18px'
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          border: `1px solid ${dividerColor}`,
          boxShadow: 'none',
          backgroundImage: 'none'
        }
      },
      variants: [
        {
          props: { variant: 'inApp' },
          style: {
            color: themeStyle.colors.mediumGrayText,
            backgroundColor:
              themeStyle.colors.softVioletBg ?? themeStyle.colors.lightVioletBg,
            border: '1px solid transparent',
            '&:hover': {
              backgroundColor: themeStyle.colors.lightVioletBg
            }
          }
        }
      ]
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: sans.style.fontFamily
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: sans.style.fontFamily
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: sans.style.fontFamily,
          fontWeight: 'inherit',
          fontVariantNumeric: 'tabular-nums'
        }
      }
    }
  }
});

export default theme;
