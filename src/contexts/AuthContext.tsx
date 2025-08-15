import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Farmer } from '../types';

interface AuthContextType {
  farmer: Farmer | null;
  login: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateFarmerProfile: (updates: Partial<Farmer>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock farmer data
const mockFarmers: Farmer[] = [
  {
    _id: '1',
    name: 'Ramesh Kumar',
    nameTelugu: 'రమేష్ కుమార్',
    phone: '+919876543210',
    district: 'Krishna',
    districtTelugu: 'కృష్ణా',
    language: 'en',
    isAuthenticated: false,
    fields: [
      {
        id: 'field_1',
        cropType: 'Cotton',
        cropTypeTelugu: 'పత్తి',
        size: 5.2,
        soilType: 'Black Cotton',
        lastIrrigation: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        ndviValue: 0.75,
        coordinates: [16.2160, 81.1496],
      },
      {
        id: 'field_2',
        cropType: 'Chili',
        cropTypeTelugu: 'మిర్చి',
        size: 2.8,
        soilType: 'Red Sandy',
        lastIrrigation: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        ndviValue: 0.68,
        coordinates: [16.2200, 81.1500],
      },
    ],
    preferences: {
      alertTypes: ['high', 'critical'],
      irrigationReminders: true,
      weatherAlerts: true,
    },
  },
  {
    _id: '2',
    name: 'Lakshmi Devi',
    nameTelugu: 'లక్ష్మీ దేవి',
    phone: '+919876543211',
    district: 'Guntur',
    districtTelugu: 'గుంటూరు',
    language: 'te',
    isAuthenticated: false,
    fields: [
      {
        id: 'field_3',
        cropType: 'Rice',
        cropTypeTelugu: 'వరి',
        size: 3.5,
        soilType: 'Alluvial',
        lastIrrigation: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        ndviValue: 0.82,
        coordinates: [16.3067, 80.4365],
      },
    ],
    preferences: {
      alertTypes: ['medium', 'high', 'critical'],
      irrigationReminders: true,
      weatherAlerts: true,
    },
  },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [farmer, setFarmer] = useState<Farmer | null>(null);

  useEffect(() => {
    // Check for stored authentication
    const storedFarmer = localStorage.getItem('agriconnect_farmer');
    if (storedFarmer) {
      setFarmer(JSON.parse(storedFarmer));
    }
  }, []);

  const login = async (phone: string, otp: string): Promise<boolean> => {
    try {
      // Simulate OTP verification
      if (otp !== '123456') {
        throw new Error('Invalid OTP');
      }

      // Find farmer by phone
      const foundFarmer = mockFarmers.find(f => f.phone === phone);
      if (!foundFarmer) {
        throw new Error('Farmer not found');
      }

      const authenticatedFarmer = { ...foundFarmer, isAuthenticated: true };
      setFarmer(authenticatedFarmer);
      localStorage.setItem('agriconnect_farmer', JSON.stringify(authenticatedFarmer));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setFarmer(null);
    localStorage.removeItem('agriconnect_farmer');
  };

  const updateFarmerProfile = (updates: Partial<Farmer>) => {
    if (farmer) {
      const updatedFarmer = { ...farmer, ...updates };
      setFarmer(updatedFarmer);
      localStorage.setItem('agriconnect_farmer', JSON.stringify(updatedFarmer));
    }
  };

  return (
    <AuthContext.Provider value={{
      farmer,
      login,
      logout,
      isAuthenticated: !!farmer?.isAuthenticated,
      updateFarmerProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};