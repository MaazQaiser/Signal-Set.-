import { Route, Routes } from 'react-router-dom';
import { CreateDispatchPage } from './pages/CreateDispatchPage';
import { DealsPage } from './pages/DealsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DealsPage />} />
      <Route path="/contract" element={<CreateDispatchPage />} />
    </Routes>
  );
}
