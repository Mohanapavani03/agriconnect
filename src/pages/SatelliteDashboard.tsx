import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Satellite, TrendingUp, MapPin, Clock, BarChart3 } from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import GlassCard from '../components/GlassCard';
import InteractiveMap from '../components/InteractiveMap';
import { useLanguage } from '../contexts/LanguageContext';
import { MEDIA_URLS, MOCK_DATA } from '../constants/media';

const SatelliteDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('Krishna');

  const districts = Object.keys(MOCK_DATA.ndviData);
  const selectedData = MOCK_DATA.ndviData[selectedDistrict];

  const getHealthColor = (status: string) => {
    const colors = {
      'Excellent': 'text-green-400',
      'Good': 'text-lime-400',
      'Moderate': 'text-yellow-400',
      'Poor': 'text-orange-400',
      'Critical': 'text-red-400',
    };
    return colors[status as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="min-h-screen pt-24">
      <VideoBackground
        videoUrl={MEDIA_URLS.satelliteVideo}
        className="min-h-screen"
      >
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-4">
                <Satellite className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t('satelliteTitle')}
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              NASA MODIS Satellite Data • Real-time Vegetation Health Assessment
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <InteractiveMap
                selectedDistrict={selectedDistrict}
                onDistrictSelect={setSelectedDistrict}
              />
            </motion.div>

            {/* NDVI Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-8 h-96">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedDistrict}
                  </h2>
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-6xl font-bold text-white mr-4">
                      {selectedData.ndvi.toFixed(2)}
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${getHealthColor(selectedData.status)}`}>
                        {t(selectedData.status.toLowerCase())}
                      </div>
                      <div className="text-white/60">NDVI Score</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedData.ndvi * 100}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* District Selection */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                  {t('selectDistrict')}
                </h3>
                <div className="space-y-3">
                  {districts.map((district) => (
                    <motion.button
                      key={district}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDistrict(district)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                        selectedDistrict === district
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                          : 'bg-white/5 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{district}</span>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: MOCK_DATA.ndviData[district].color }}
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Status Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-2 grid md:grid-cols-3 gap-4"
            >
              <GlassCard className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-white font-semibold mb-2">Health Index</div>
                <div className={`text-3xl font-bold ${getHealthColor(selectedData.status)}`}>
                  {Math.round(selectedData.ndvi * 100)}%
                </div>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <Satellite className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="text-white font-semibold mb-2">Data Source</div>
                <div className="text-2xl font-bold text-blue-400">
                  NASA MODIS
                </div>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <div className="text-white font-semibold mb-2">{t('lastUpdated')}</div>
                <div className="text-2xl font-bold text-purple-400">
                  2h ago
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* NDVI Scale */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                NDVI Vegetation Health Scale
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex-1 h-6 bg-gradient-to-r from-red-500 via-yellow-500 via-lime-500 to-green-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-sm text-white/70">
                <span>0.0 - Critical</span>
                <span>0.2 - Poor</span>
                <span>0.4 - Moderate</span>
                <span>0.6 - Good</span>
                <span>0.8+ - Excellent</span>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default SatelliteDashboard;