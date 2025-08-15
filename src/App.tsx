import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import AlertSystem from './components/AlertSystem';
import Home from './pages/Home';
import Login from './pages/Login';
import SatelliteDashboard from './pages/SatelliteDashboard';
import CycloneDefense from './pages/CycloneDefense';
import CropGuardian from './pages/CropGuardian';
import WaterSaver from './pages/WaterSaver';
import FarmerCompanion from './pages/FarmerCompanion';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-black">
            <Navigation />
            <AlertSystem />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/satellite" element={<SatelliteDashboard />} />
              <Route path="/cyclone" element={<CycloneDefense />} />
              <Route path="/crop" element={<CropGuardian />} />
              <Route path="/water" element={<WaterSaver />} />
              <Route path="/farmer" element={<FarmerCompanion />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;