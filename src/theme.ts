import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#2DA551' },
    secondary: { main: '#146DFF' },
    text: {
      primary: '#262527',
      secondary: '#86868B',
    },
    background: {
      default: '#F5F5F6',
      paper: '#FFFFFF',
    },
    divider: '#E6E6E7',
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h5: { fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: 0 },
    h4: { fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: 0 },
    subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: '24px' },
    subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: '20px' },
    body1: { fontSize: 16, fontWeight: 400, lineHeight: '24px' },
    body2: { fontSize: 14, fontWeight: 400, lineHeight: '20px' },
    caption: { fontSize: 12, fontWeight: 500, lineHeight: '18px' },
    button: { fontSize: 14, fontWeight: 500, lineHeight: '20px', textTransform: 'none' },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: 'transparent',
        },
        input: {
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 12,
          lineHeight: '18px',
        },
        notchedOutline: {
          borderColor: '#E6E6E7',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          fontSize: 12,
        },
        input: {
          fontSize: 12,
          lineHeight: '18px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 12,
          lineHeight: '18px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '18px',
          color: '#6A6A70',
        },
        shrink: {
          fontSize: 12,
          lineHeight: '18px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // MUI v9 can derive 16px from theme shape; keep primary actions at 8px
          borderRadius: '8px',
          padding: '8px 14px',
          boxShadow: 'none',
        },
        outlined: {
          borderColor: '#E6E6E7',
          color: '#444446',
          '&:hover': { borderColor: '#D0CFD2', backgroundColor: alpha('#E6E6E7', 0.2) },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPickersTextField: {
      styleOverrides: {
        root: { fontSize: 12, lineHeight: '18px' },
      },
    },
    MuiPickersInputBase: {
      styleOverrides: {
        root: { fontSize: 12, lineHeight: '18px' },
        input: { fontSize: 12, lineHeight: '18px' },
        sectionsContainer: { fontSize: 12, lineHeight: '18px' },
        sectionContent: { fontSize: 12, lineHeight: '18px' },
      },
    },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: { fontSize: 12, lineHeight: '18px' },
        input: { fontSize: 12, lineHeight: '18px' },
        sectionsContainer: { fontSize: 12, lineHeight: '18px' },
        sectionContent: { fontSize: 12, lineHeight: '18px' },
      },
    },
    MuiPickersSectionList: {
      styleOverrides: {
        root: { fontSize: 12, lineHeight: '18px' },
        section: { fontSize: 12, lineHeight: '18px' },
        sectionContent: { fontSize: 12, lineHeight: '18px' },
      },
    },
  },
};

export const appTheme = createTheme(themeOptions);

