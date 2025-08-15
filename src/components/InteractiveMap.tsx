import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Satellite, TrendingUp, AlertTriangle } from 'lucide-react';
import { NDVIData, CycloneData } from '../types';
import { nasaApi } from '../services/nasaApi';
import GlassCard from './GlassCard';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  selectedDistrict?: string;
  onDistrictSelect?: (district: string) => void;
  showCyclones?: boolean;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedDistrict,
  onDistrictSelect,
  showCyclones = false,
}) => {
  const [ndviData, setNdviData] = useState<NDVIData[]>([]);
  const [cycloneData, setCycloneData] = useState<CycloneData[]>([]);
  const [loading, setLoading] = useState(true);

  // Center coordinates for Andhra Pradesh and Telangana
  const center: LatLngExpression = [16.5062, 80.6480];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ndvi, cyclones] = await Promise.all([
          nasaApi.fetchNDVIData(),
          showCyclones ? nasaApi.fetchCycloneData() : Promise.resolve([]),
        ]);
        setNdviData(ndvi);
        setCycloneData(cyclones);
      } catch (error) {
        console.error('Error fetching map data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showCyclones]);

  const getMarkerColor = (ndvi: number) => {
    if (ndvi >= 0.8) return '#16A34A'; // Dark green
    if (ndvi >= 0.6) return '#22C55E'; // Green
    if (ndvi >= 0.4) return '#65A30D'; // Yellow-green
    if (ndvi >= 0.2) return '#CA8A04'; // Yellow
    return '#DC2626'; // Red
  };

  const getMarkerSize = (ndvi: number) => {
    return Math.max(10, ndvi * 30);
  };

  if (loading) {
    return (
      <GlassCard className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading satellite data...</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden">
      <div className="h-96 relative">
        <MapContainer
          center={center}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* NDVI Markers */}
          {ndviData.map((data) => (
            <CircleMarker
              key={data.district}
              center={data.coordinates}
              radius={getMarkerSize(data.ndvi)}
              fillColor={getMarkerColor(data.ndvi)}
              color="#ffffff"
              weight={2}
              opacity={0.8}
              fillOpacity={0.6}
              eventHandlers={{
                click: () => onDistrictSelect?.(data.district),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{data.district}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Satellite className="w-4 h-4 text-blue-500" />
                      <span>NDVI: {data.ndvi.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Status: {data.status}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Updated: {new Date(data.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Cyclone Markers */}
          {showCyclones && cycloneData.map((cyclone) => (
            <React.Fragment key={cyclone.id}>
              <CircleMarker
                center={cyclone.coordinates}
                radius={20}
                fillColor="#DC2626"
                color="#ffffff"
                weight={3}
                opacity={1}
                fillOpacity={0.7}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      Cyclone {cyclone.name}
                    </h3>
                    <div className="space-y-1">
                      <div>Wind Speed: {cyclone.windSpeed} km/h</div>
                      <div>Pressure: {cyclone.pressure} hPa</div>
                      <div>Category: {cyclone.category}</div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
              
              {/* Cyclone Path */}
              {cyclone.path.map((point, index) => (
                <CircleMarker
                  key={`${cyclone.id}-path-${index}`}
                  center={point.coordinates}
                  radius={5}
                  fillColor="#FCA5A5"
                  color="#DC2626"
                  weight={1}
                  opacity={0.6}
                  fillOpacity={0.4}
                />
              ))}
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <GlassCard className="p-3">
            <h4 className="text-white font-semibold text-sm mb-2">NDVI Scale</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-white/80 text-xs">Critical (0.0-0.2)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-white/80 text-xs">Poor (0.2-0.4)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-lime-500" />
                <span className="text-white/80 text-xs">Moderate (0.4-0.6)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-white/80 text-xs">Good (0.6-0.8)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-700" />
                <span className="text-white/80 text-xs">Excellent (0.8+)</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </GlassCard>
  );
};

export default InteractiveMap;