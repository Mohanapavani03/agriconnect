import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Clock, TrendingDown, Activity } from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../contexts/LanguageContext';
import { MEDIA_URLS, MOCK_DATA } from '../constants/media';

const WaterSaver: React.FC = () => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400 bg-green-500/20' : 'text-blue-400 bg-blue-500/20';
  };

  const getDepthStatus = (depth: number) => {
    if (depth < 10) return { status: 'Shallow', color: 'text-green-400' };
    if (depth < 20) return { status: 'Moderate', color: 'text-yellow-400' };
    return { status: 'Deep', color: 'text-red-400' };
  };

  const depthInfo = getDepthStatus(MOCK_DATA.waterData.groundwaterDepth);

  return (
    <div className="min-h-screen pt-24">
      <VideoBackground
        videoUrl={MEDIA_URLS.irrigation}
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mr-4">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t('waterTitle')}
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Smart Irrigation Scheduling • Water Conservation • Real-time Monitoring
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tank Level & Groundwater */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Tank Level */}
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Droplets className="w-6 h-6 mr-3 text-blue-400" />
                  {t('tankLevel')}
                </h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-600"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - MOCK_DATA.waterData.tankLevel / 100) }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-blue-400"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{MOCK_DATA.waterData.tankLevel}%</div>
                        <div className="text-sm text-white/60">Full</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg text-blue-400 font-semibold">Optimal Level</div>
                  <div className="text-white/70">Ready for irrigation</div>
                </div>
              </GlassCard>

              {/* Groundwater Depth */}
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <TrendingDown className="w-6 h-6 mr-3 text-cyan-400" />
                  {t('groundwaterDepth')}
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {MOCK_DATA.waterData.groundwaterDepth}m
                  </div>
                  <div className={`text-xl font-semibold mb-4 ${depthInfo.color}`}>
                    {depthInfo.status}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(MOCK_DATA.waterData.groundwaterDepth / 30 * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className={`h-3 rounded-full ${
                        MOCK_DATA.waterData.groundwaterDepth < 10 
                          ? 'bg-green-500' 
                          : MOCK_DATA.waterData.groundwaterDepth < 20 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Canal Rotation Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-purple-400" />
                  {t('canalSchedule')}
                </h3>
                <div className="space-y-4">
                  {MOCK_DATA.waterData.canalRotation.map((rotation, index) => (
                    <motion.div
                      key={rotation.area}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        rotation.status === 'active' 
                          ? 'bg-green-500/20 border-green-500' 
                          : 'bg-blue-500/20 border-blue-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{rotation.area}</h4>
                          <div className="text-white/70">{rotation.startTime} - {rotation.duration}</div>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(rotation.status)}`}>
                            {rotation.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Water Management Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Today's Water Management Overview
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">2,450L</div>
                  <div className="text-white/70">Water Saved</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">87%</div>
                  <div className="text-white/70">Efficiency</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">6.5h</div>
                  <div className="text-white/70">Active Time</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">23%</div>
                  <div className="text-white/70">Cost Reduction</div>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default WaterSaver;