export interface Farmer {
  _id: string;
  name: string;
  nameTelugu: string;
  phone: string;
  district: string;
  districtTelugu: string;
  language: 'en' | 'te';
  isAuthenticated: boolean;
  fields: Array<{
    id: string;
    cropType: string;
    cropTypeTelugu: string;
    size: number;
    soilType: string;
    lastIrrigation: Date;
    ndviValue: number;
    coordinates: [number, number];
  }>;
  preferences: {
    alertTypes: string[];
    irrigationReminders: boolean;
    weatherAlerts: boolean;
  };
}

export interface NDVIData {
  district: string;
  ndvi: number;
  status: string;
  color: string;
  coordinates: [number, number];
  timestamp: string;
}

export interface WeatherAlert {
  id: string;
  type: 'cyclone' | 'rainfall' | 'drought' | 'disease';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  messageTelugu: string;
  district: string;
  timestamp: Date;
  expiresAt: Date;
}

export interface CycloneData {
  id: string;
  name: string;
  coordinates: [number, number];
  windSpeed: number;
  pressure: number;
  category: number;
  path: Array<{
    time: string;
    coordinates: [number, number];
    windSpeed: number;
  }>;
}

export interface DiseaseRisk {
  cropType: string;
  disease: string;
  diseaseTelugu: string;
  riskLevel: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  factors: string[];
  recommendations: string[];
  recommendationsTelugu: string[];
}