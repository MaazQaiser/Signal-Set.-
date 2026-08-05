import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import { CreateDispatchPage } from './pages/CreateDispatchPage';
import { DealsPage } from './pages/DealsPage';
import { HomePage } from './pages/HomePage';
import { MobileContractPage } from './pages/MobileContractPage';
import { MobileDealsPage } from './pages/MobileDealsPage';
import { CreateDispatchPage as SignalCreateDispatchPage } from './pages/signal/CreateDispatchPage';
import { DealsPage as SignalDealsPage } from './pages/signal/DealsPage';
import { HomePage as SignalHomePage } from './pages/signal/HomePage';
import { MobileContractPage as SignalMobileContractPage } from './pages/signal/MobileContractPage';
import { MobileDealsPage as SignalMobileDealsPage } from './pages/signal/MobileDealsPage';
import { signalTheme } from './theme/signalTheme';

function SignalTheme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={signalTheme}>{children}</ThemeProvider>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/filtergo" replace />} />

      {/* FilterGo tenant */}
      <Route path="/filtergo" element={<HomePage />} />
      <Route path="/filtergo/deals" element={<DealsPage />} />
      <Route path="/filtergo/mobile" element={<MobileDealsPage />} />
      <Route path="/filtergo/mobile-contract" element={<MobileContractPage />} />
      <Route path="/filtergo/contract" element={<CreateDispatchPage />} />

      {/* Signal tenant */}
      <Route path="/signal" element={<SignalTheme><SignalHomePage /></SignalTheme>} />
      <Route path="/signal/deals" element={<SignalTheme><SignalDealsPage /></SignalTheme>} />
      <Route path="/signal/mobile" element={<SignalTheme><SignalMobileDealsPage /></SignalTheme>} />
      <Route path="/signal/mobile-contract" element={<SignalTheme><SignalMobileContractPage /></SignalTheme>} />
      <Route path="/signal/contract" element={<SignalTheme><SignalCreateDispatchPage /></SignalTheme>} />
    </Routes>
  );
}
