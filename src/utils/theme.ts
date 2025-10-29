const themeStyle = require('../../content/data/style.json');
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

console.log();
let theme = createTheme({
  palette: {
    mode: themeStyle.mode ?? 'light',
    primary: {
      main: themeStyle.primaryColor ?? '#1F2B9D'
    },
    secondary: {
      main: themeStyle.secondaryColor ?? '#F65458'
    },
    text: {
      primary: themeStyle.mode === 'dark' ? '#fff' : '#02001d',
      secondary: themeStyle.mode === 'dark' ? '#979797' : '#374151'
    }
  },
  colors: Object.keys(themeStyle.colors).reduce(
    (acc, key) => ({ ...acc, [key]: themeStyle.colors[key] }),
    {}
  ),
  shape: {
    borderRadius: 4
  },
  typography: {
    h1: {
      fontWeight: 500
    },
    h2: {
      fontWeight: 500
    },
    h3: {
      fontWeight: 500
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontWeight: 'inherit'
        }
      }
    },
    MuiCard: {
      variants: [
        {
          props: { variant: 'inApp' },
          style: {
            color: themeStyle.colors.mediumGrayText,
            backgroundColor: themeStyle.colors.lightVioletBg,
            '&:hover': {
              backgroundColor: themeStyle.colors.strongVioletBg
            }
          }
        }
      ]
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
