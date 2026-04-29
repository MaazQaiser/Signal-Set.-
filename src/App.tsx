import { Route, Routes } from 'react-router-dom';
import { CreateDispatchPage } from './pages/CreateDispatchPage';
import { DealsPage } from './pages/DealsPage';
import { HomePage } from './pages/HomePage';
import { MobileContractPage } from './pages/MobileContractPage';
import { MobileDealsPage } from './pages/MobileDealsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/deals" element={<DealsPage />} />
      <Route path="/mobile" element={<MobileDealsPage />} />
      <Route path="/mobile-contract" element={<MobileContractPage />} />
      <Route path="/contract" element={<CreateDispatchPage />} />
    </Routes>
  );
}
