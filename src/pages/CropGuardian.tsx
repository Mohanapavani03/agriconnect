import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, TrendingDown, Minus, Bug, Leaf } from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../contexts/LanguageContext';
import { MEDIA_URLS, MOCK_DATA } from '../constants/media';

const CropGuardian: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('Chili');

  const crops = Object.keys(MOCK_DATA.cropRisk);
  const selectedData = MOCK_DATA.cropRisk[selectedCrop as keyof typeof MOCK_DATA.cropRisk];

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return 'text-red-400 bg-red-500/20';
    if (risk >= 50) return 'text-orange-400 bg-orange-500/20';
    if (risk >= 30) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return TrendingUp;
      case 'decreasing': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-red-400';
      case 'decreasing': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <VideoBackground
        videoUrl={MEDIA_URLS.cropField}
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t('cropTitle')}
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              AI-Powered Disease Prediction • Early Warning System • Preventive Care Recommendations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Crop Selection */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Leaf className="w-6 h-6 mr-3 text-green-400" />
                  {t('selectCrop')}
                </h3>
                <div className="space-y-3">
                  {crops.map((crop) => (
                    <motion.button
                      key={crop}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCrop(crop)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                        selectedCrop === crop
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                          : 'bg-white/5 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{crop}</span>
                        <div className={`px-2 py-1 rounded text-xs ${getRiskColor(MOCK_DATA.cropRisk[crop as keyof typeof MOCK_DATA.cropRisk].risk)}`}>
                          {MOCK_DATA.cropRisk[crop as keyof typeof MOCK_DATA.cropRisk].risk}%
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Risk Assessment */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <GlassCard className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedCrop} Risk Assessment
                  </h2>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="10"
                          fill="transparent"
                          className="text-gray-600"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="10"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - selectedData.risk / 100) }}
                          transition={{ duration: 1, delay: 0.6 }}
                          className={selectedData.risk >= 70 ? 'text-red-400' : selectedData.risk >= 50 ? 'text-orange-400' : selectedData.risk >= 30 ? 'text-yellow-400' : 'text-green-400'}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                          <div className="text-3xl font-bold text-white">{selectedData.risk}%</div>
                          <div className="text-sm text-white/60">Risk</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="bg-white/10 rounded-lg p-6"
                    >
                      <Bug className="w-10 h-10 text-red-400 mx-auto mb-4" />
                      <div className="text-white font-semibold mb-2">{t('diseaseType')}</div>
                      <div className="text-xl font-bold text-red-400">
                        {selectedData.disease}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 }}
                      className="bg-white/10 rounded-lg p-6"
                    >
                      {React.createElement(getTrendIcon(selectedData.trend), {
                        className: `w-10 h-10 ${getTrendColor(selectedData.trend)} mx-auto mb-4`
                      })}
                      <div className="text-white font-semibold mb-2">{t('trend')}</div>
                      <div className={`text-xl font-bold capitalize ${getTrendColor(selectedData.trend)}`}>
                        {selectedData.trend}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8"
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Recommended Actions for {selectedCrop}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-500/20 rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Immediate Action</h4>
                  <p className="text-white/70">Apply preventive fungicide spray within 48 hours</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-500/20 rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Field Monitoring</h4>
                  <p className="text-white/70">Inspect plants daily for early symptoms</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-500/20 rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Bug className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Pest Control</h4>
                  <p className="text-white/70">Deploy integrated pest management strategy</p>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default CropGuardian;