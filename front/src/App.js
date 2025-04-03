import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import AirportTransferPage from './pages/AirportTransferPage';
import LongDistancePage from './pages/LongDistancePage';
import CustomTransferPage from './pages/CustomTransferPage';
import VipServicePage from './pages/VipServicePage';
import ContactPage from './pages/ContactPage';
import './styles/global.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trajets-aeroport-gare" element={<AirportTransferPage />} />
            <Route path="/trajets-longues-distances" element={<LongDistancePage />} />
            <Route path="/trajets-sur-mesure" element={<CustomTransferPage />} />
            <Route path="/prestation-vip" element={<VipServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;