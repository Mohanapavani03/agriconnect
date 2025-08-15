import axios from 'axios';
import { NDVIData, CycloneData } from '../types';

// NASA API Configuration
const NASA_BASE_URL = 'https://modis.gsfc.nasa.gov/data';
const GPM_BASE_URL = 'https://gpm.nasa.gov/data';

// Mock NASA API calls - replace with real endpoints when available
export class NASADataService {
  private static instance: NASADataService;
  
  public static getInstance(): NASADataService {
    if (!NASADataService.instance) {
      NASADataService.instance = new NASADataService();
    }
    return NASADataService.instance;
  }

  // MODIS NDVI Data
  async fetchNDVIData(district?: string): Promise<NDVIData[]> {
    try {
      // Mock implementation - replace with real NASA MODIS API
      const mockData: NDVIData[] = [
        {
          district: 'Krishna',
          ndvi: 0.75,
          status: 'Excellent',
          color: '#22C55E',
          coordinates: [16.2160, 81.1496],
          timestamp: new Date().toISOString(),
        },
        {
          district: 'Guntur',
          ndvi: 0.68,
          status: 'Good',
          color: '#65A30D',
          coordinates: [16.3067, 80.4365],
          timestamp: new Date().toISOString(),
        },
        {
          district: 'Warangal',
          ndvi: 0.82,
          status: 'Excellent',
          color: '#16A34A',
          coordinates: [17.9689, 79.5941],
          timestamp: new Date().toISOString(),
        },
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return district 
        ? mockData.filter(d => d.district === district)
        : mockData;
    } catch (error) {
      console.error('Error fetching NDVI data:', error);
      throw new Error('Failed to fetch satellite data');
    }
  }

  // GPM Rainfall Data
  async fetchRainfallData(coordinates: [number, number], hours: number = 48): Promise<any[]> {
    try {
      // Mock GPM data - replace with real NASA GPM API
      const mockRainfall = Array.from({ length: hours / 6 }, (_, i) => ({
        time: new Date(Date.now() + i * 6 * 60 * 60 * 1000).toISOString(),
        rainfall: Math.random() * 50,
        intensity: Math.random() * 100,
        coordinates,
      }));

      await new Promise(resolve => setTimeout(resolve, 800));
      return mockRainfall;
    } catch (error) {
      console.error('Error fetching rainfall data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  // Cyclone Tracking Data
  async fetchCycloneData(): Promise<CycloneData[]> {
    try {
      // Mock cyclone data - replace with real NASA/NOAA API
      const mockCyclones: CycloneData[] = [
        {
          id: 'CYCLONE_2024_001',
          name: 'Vardah',
          coordinates: [13.0827, 80.2707],
          windSpeed: 85,
          pressure: 980,
          category: 2,
          path: Array.from({ length: 8 }, (_, i) => ({
            time: new Date(Date.now() + i * 6 * 60 * 60 * 1000).toISOString(),
            coordinates: [
              13.0827 + i * 0.5,
              80.2707 + i * 0.3
            ] as [number, number],
            windSpeed: 85 - i * 5,
          })),
        },
      ];

      await new Promise(resolve => setTimeout(resolve, 1200));
      return mockCyclones;
    } catch (error) {
      console.error('Error fetching cyclone data:', error);
      throw new Error('Failed to fetch cyclone data');
    }
  }

  // Historical Trend Analysis
  async fetchHistoricalTrends(district: string, months: number = 12): Promise<any[]> {
    try {
      // Mock historical data - replace with real Landsat API
      const mockTrends = Array.from({ length: months }, (_, i) => ({
        month: new Date(Date.now() - (months - i) * 30 * 24 * 60 * 60 * 1000).toISOString(),
        ndvi: 0.4 + Math.random() * 0.4,
        rainfall: Math.random() * 200,
        temperature: 25 + Math.random() * 15,
      }));

      await new Promise(resolve => setTimeout(resolve, 1500));
      return mockTrends;
    } catch (error) {
      console.error('Error fetching historical trends:', error);
      throw new Error('Failed to fetch historical data');
    }
  }
}

export const nasaApi = NASADataService.getInstance();