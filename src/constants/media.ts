export const MEDIA_URLS = {
  // Hero video backgrounds
  heroVideo: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  satelliteVideo: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4',
  farmVideo: 'https://videos.pexels.com/video-files/2691074/2691074-uhd_2560_1440_30fps.mp4',
  
  // Background images
  cropField: 'https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  satellite: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  weather: 'https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  irrigation: 'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  farmer: 'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
};

export const MOCK_DATA = {
  // NDVI data for Andhra Pradesh and Telangana districts
  ndviData: {
    'Visakhapatnam': { ndvi: 0.76, status: 'Excellent', color: '#22C55E' },
    'East Godavari': { ndvi: 0.82, status: 'Excellent', color: '#16A34A' },
    'West Godavari': { ndvi: 0.78, status: 'Excellent', color: '#22C55E' },
    'Krishna': { ndvi: 0.65, status: 'Good', color: '#65A30D' },
    'Guntur': { ndvi: 0.58, status: 'Moderate', color: '#CA8A04' },
    'Prakasam': { ndvi: 0.42, status: 'Poor', color: '#DC2626' },
    'Nellore': { ndvi: 0.71, status: 'Good', color: '#22C55E' },
    'Chittoor': { ndvi: 0.63, status: 'Good', color: '#65A30D' },
    'Kadapa': { ndvi: 0.39, status: 'Poor', color: '#DC2626' },
    'Anantapur': { ndvi: 0.33, status: 'Critical', color: '#B91C1C' },
    'Kurnool': { ndvi: 0.47, status: 'Moderate', color: '#CA8A04' },
    'Hyderabad': { ndvi: 0.69, status: 'Good', color: '#22C55E' },
    'Warangal': { ndvi: 0.74, status: 'Excellent', color: '#22C55E' },
    'Nizamabad': { ndvi: 0.67, status: 'Good', color: '#65A30D' },
    'Karimnagar': { ndvi: 0.71, status: 'Good', color: '#22C55E' },
    'Medak': { ndvi: 0.54, status: 'Moderate', color: '#CA8A04' },
    'Rangareddy': { ndvi: 0.61, status: 'Good', color: '#65A30D' },
    'Mahbubnagar': { ndvi: 0.44, status: 'Poor', color: '#DC2626' },
    'Nalgonda': { ndvi: 0.56, status: 'Moderate', color: '#CA8A04' },
    'Adilabad': { ndvi: 0.79, status: 'Excellent', color: '#16A34A' },
  },
  
  // Cyclone forecast data
  cycloneForecast: [
    { time: '00:00', rainfall: 12, windSpeed: 45, alertLevel: 'Medium', color: '#F59E0B' },
    { time: '06:00', rainfall: 18, windSpeed: 52, alertLevel: 'High', color: '#EF4444' },
    { time: '12:00', rainfall: 25, windSpeed: 68, alertLevel: 'Severe', color: '#DC2626' },
    { time: '18:00', rainfall: 31, windSpeed: 74, alertLevel: 'Severe', color: '#DC2626' },
    { time: '24:00', rainfall: 22, windSpeed: 58, alertLevel: 'High', color: '#EF4444' },
    { time: '30:00', rainfall: 15, windSpeed: 41, alertLevel: 'Medium', color: '#F59E0B' },
    { time: '36:00', rainfall: 8, windSpeed: 28, alertLevel: 'Low', color: '#22C55E' },
    { time: '42:00', rainfall: 4, windSpeed: 18, alertLevel: 'Low', color: '#22C55E' },
    { time: '48:00', rainfall: 2, windSpeed: 12, alertLevel: 'Low', color: '#22C55E' },
  ],
  
  // Crop disease risk data
  cropRisk: {
    Chili: { disease: 'Bacterial Wilt', risk: 73, trend: 'increasing' },
    Cotton: { disease: 'Bollworm Attack', risk: 45, trend: 'stable' },
    Rice: { disease: 'Brown Spot', risk: 62, trend: 'decreasing' },
    Sugarcane: { disease: 'Red Rot', risk: 38, trend: 'stable' },
  },
  
  // Water management data
  waterData: {
    tankLevel: 68,
    groundwaterDepth: 12.5,
    canalRotation: [
      { area: 'Block A', startTime: '06:00', duration: '4 hours', status: 'active' },
      { area: 'Block B', startTime: '10:00', duration: '4 hours', status: 'scheduled' },
      { area: 'Block C', startTime: '14:00', duration: '4 hours', status: 'scheduled' },
      { area: 'Block D', startTime: '18:00', duration: '4 hours', status: 'scheduled' },
    ],
  },
  
  // Farmer profiles
  farmers: [
    {
      id: 1,
      name: 'Ramesh Kumar',
      nameTelugu: 'రమేష్ కుమార్',
      district: 'Krishna',
      districtTelugu: 'కృష్ణా',
      crop: 'Cotton',
      cropTelugu: 'పత్తి',
      irrigationWindow: '06:00 - 10:00 AM',
      rainfallPeak: '18:00 Today',
      landSize: '5.2 acres',
    },
    {
      id: 2,
      name: 'Lakshmi Devi',
      nameTelugu: 'లక్ష్మీ దేవి',
      district: 'Guntur',
      districtTelugu: 'గుంటూరు',
      crop: 'Chili',
      cropTelugu: 'మిర్చి',
      irrigationWindow: '05:30 - 09:30 AM',
      rainfallPeak: '20:00 Tomorrow',
      landSize: '3.8 acres',
    },
  ],
};