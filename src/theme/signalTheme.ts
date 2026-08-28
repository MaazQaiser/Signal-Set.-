import { createTheme } from '@mui/material/styles';
import { appTheme } from '../theme';

/** Signal tenant theme — does not affect FilterGo. */
export const signalTheme = createTheme(appTheme, {
  palette: {
    primary: { main: '#146dff' },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        clearIndicator: {
          '& .MuiSvgIcon-root': { fontSize: 16 },
        },
      },
    },
  },
});
