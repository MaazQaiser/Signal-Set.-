import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '@fontsource/inter/latin.css';
import './index.css';
import App from './App.tsx';
import { appTheme } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
