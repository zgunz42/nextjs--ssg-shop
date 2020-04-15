import { deepmerge } from '@material-ui/utils';
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#0052cc',
    },
    secondary: {
      light: '#f3f6fe',
      main: '#edf2ff',
      dark: '#dee7fd',
      contrastText: '#1976d2',
    },
    error: {
      main: '#ff001f',
    },
    success: {
      main: '#28a745',
    },
    text: {
      primary: '#2c2c2c',
      secondary: grey[600],
      disabled: grey[500],
    },
    action: {
      active: grey[600],
      disabledBackground: 'rgba(0, 0, 0, 0.06)',
    },
    divider: 'rgba(0, 0, 0, 0.25)',
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h1',
        h2: 'h1',
        h3: 'h1',
        body1: 'p',
      },
    },
    MuiRadio: {
      color: 'primary',
    },
  },
});

const theme = deepmerge(rawTheme, {
  palette: {
    background: {
      default: rawTheme.palette.common.white,
      placeholder: grey[100],
    },
    success: {
      background: '#d6ffd3',
      text: '#389543',
    },
    warning: {
      background: '#fff2df',
      text: '#ca7700',
    },
    info: {
      background: rawTheme.palette.secondary.main,
      text: rawTheme.palette.primary.main,
    },
    error: {
      background: '#ffe7e7',
      text: rawTheme.palette.error.main,
    },
  },
  typography: {
    h1: {
      fontWeight: rawTheme.typography.fontWeightMedium,
      fontSize: 42,
      lineHeight: 1.1,
      [rawTheme.breakpoints.down('xs')]: {
        fontSize: 26,
      },
    },
    h2: rawTheme.typography.h4,
    h3: rawTheme.typography.h5,
    h4: {
      fontWeight: rawTheme.typography.fontWeightMedium,
      fontSize: 20,
      [rawTheme.breakpoints.down('xs')]: {
        fontSize: 18,
      },
    },
    h5: {
      fontWeight: rawTheme.typography.fontWeightMedium,
      fontSize: 20,
      [rawTheme.breakpoints.down('xs')]: {
        fontSize: 16,
      },
    },
    h6: {
      fontSize: 14,
      color: rawTheme.palette.text.secondary,
    },
    subtitle1: {
      fontWeight: rawTheme.typography.fontWeightMedium,
      fontSize: 15,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: rawTheme.typography.fontWeightLight,
      fontSize: 15,
    },
    button: {
      fontSize: 16,
      lineHeight: 1.2,
    },
    caption: {
      fontSize: 11,
      color: rawTheme.palette.text.secondary,
    },
  },
  nprogress: {
    color: rawTheme.palette.primary.light,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          overflowY: 'scroll',
        },
      },
    },
  },
});

theme.shadows[2] = '0 20px 20px -20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.06)';

export default theme;
