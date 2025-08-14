import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import SatelliteDashboard from './pages/SatelliteDashboard';
import CycloneDefense from './pages/CycloneDefense';
import CropGuardian from './pages/CropGuardian';
import WaterSaver from './pages/WaterSaver';
import FarmerCompanion from './pages/FarmerCompanion';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/satellite" element={<SatelliteDashboard />} />
            <Route path="/cyclone" element={<CycloneDefense />} />
            <Route path="/crop" element={<CropGuardian />} />
            <Route path="/water" element={<WaterSaver />} />
            <Route path="/farmer" element={<FarmerCompanion />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;