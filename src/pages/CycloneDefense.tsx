import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Wind, AlertTriangle, Activity } from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import GlassCard from '../components/GlassCard';
import InteractiveMap from '../components/InteractiveMap';
import { useLanguage } from '../contexts/LanguageContext';
import { MEDIA_URLS, MOCK_DATA } from '../constants/media';

const CycloneDefense: React.FC = () => {
  const { t } = useLanguage();

  const getAlertColor = (level: string) => {
    const colors = {
      'Low': 'text-green-400 bg-green-500/20',
      'Medium': 'text-yellow-400 bg-yellow-500/20',
      'High': 'text-orange-400 bg-orange-500/20',
      'Severe': 'text-red-400 bg-red-500/20',
    };
    return colors[level as keyof typeof colors] || 'text-gray-400 bg-gray-500/20';
  };

  return (
    <div className="min-h-screen pt-24">
      <VideoBackground
        videoUrl={MEDIA_URLS.weather}
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mr-4">
                <CloudRain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t('cycloneTitle')}
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              NASA GPM Precipitation Data • Advanced Weather Radar • Real-time Cyclone Tracking
            </p>
          </motion.div>

          {/* Cyclone Tracking Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-red-400" />
                Live Cyclone Tracking
              </h3>
              <InteractiveMap showCyclones={true} />
            </GlassCard>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Forecast Table */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-orange-400" />
                  48-Hour Forecast
                </h3>
                <div className="overflow-hidden rounded-lg">
                  <div className="grid grid-cols-4 gap-4 bg-white/5 p-4 font-semibold text-white text-sm">
                    <div>Time</div>
                    <div className="flex items-center">
                      <CloudRain className="w-4 h-4 mr-2" />
                      {t('rainfall')}
                    </div>
                    <div className="flex items-center">
                      <Wind className="w-4 h-4 mr-2" />
                      {t('windSpeed')}
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Alert
                    </div>
                  </div>
                  {MOCK_DATA.cycloneForecast.map((forecast, index) => (
                    <motion.div
                      key={forecast.time}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 hover:bg-white/5 transition-colors duration-300"
                    >
                      <div className="text-white font-medium">{forecast.time}</div>
                      <div className="text-blue-400 font-semibold">{forecast.rainfall}mm</div>
                      <div className="text-cyan-400 font-semibold">{forecast.windSpeed} km/h</div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAlertColor(forecast.alertLevel)}`}>
                          {forecast.alertLevel}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Radar Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-blue-400" />
                  {t('radarTitle')}
                </h3>
                <div className="aspect-square bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <div className="w-full h-full border-2 border-green-400/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-0.5 h-1/2 bg-green-400 origin-bottom transform -translate-x-1/2"></div>
                  </motion.div>
                  
                  {/* Radar Circles */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute border border-green-400/20 rounded-full`}
                      style={{
                        width: `${(i + 1) * 25}%`,
                        height: `${(i + 1) * 25}%`,
                      }}
                    ></div>
                  ))}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">NASA GPM</div>
                      <div className="text-green-400 text-sm">Live Radar Data</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Alert Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <GlassCard className="p-8">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-500/20 rounded-lg p-6"
                >
                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-red-400 mb-2">2</div>
                  <div className="text-white">Severe Alerts</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-orange-500/20 rounded-lg p-6"
                >
                  <Wind className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-400 mb-2">74</div>
                  <div className="text-white">Max Wind (km/h)</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-500/20 rounded-lg p-6"
                >
                  <CloudRain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-400 mb-2">31</div>
                  <div className="text-white">Peak Rainfall (mm)</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-purple-500/20 rounded-lg p-6"
                >
                  <Activity className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-400 mb-2">12</div>
                  <div className="text-white">Hours to Peak</div>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default CycloneDefense;