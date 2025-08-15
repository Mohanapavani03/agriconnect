import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Leaf, CloudRain, Clock, TrendingUp } from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import GlassCard from '../components/GlassCard';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { MEDIA_URLS } from '../constants/media';

const FarmerCompanion: React.FC = () => {
  const { farmer, isAuthenticated, logout } = useAuth();
  const { language, t } = useLanguage();
  const isEnglish = language === 'en';

  if (!isAuthenticated || !farmer) {
    return (
      <VideoBackground
        videoUrl={MEDIA_URLS.farmer}
        className="min-h-screen pt-24"
      >
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('farmerTitle')}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Please login to access your personalized dashboard
            </p>
          </motion.div>
          <LoginForm />
        </div>
      </VideoBackground>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <VideoBackground
        videoUrl={MEDIA_URLS.farmer}
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t('farmerTitle')}
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Personalized Agricultural Intelligence • Custom Recommendations • Real-time Updates
            </p>
          </motion.div>

          {/* Farmer Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Welcome, {isEnglish ? farmer.name : farmer.nameTelugu}
                    </h2>
                    <p className="text-white/70">
                      {isEnglish ? farmer.district : farmer.districtTelugu} • {farmer.fields.length} Fields
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Logout
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Farmer Profile */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isEnglish ? farmer.name : farmer.nameTelugu}
                  </h3>
                  <p className="text-white/70">Farmer ID: {farmer._id.padStart(6, '0')}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">
                        {isEnglish ? farmer.district : farmer.districtTelugu}
                      </div>
                      <div className="text-white/60 text-sm">District</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Leaf className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">
                        {farmer.fields.map(field => 
                          isEnglish ? field.cropType : field.cropTypeTelugu
                        ).join(', ')}
                      </div>
                      <div className="text-white/60 text-sm">Crops</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-white font-medium">
                        {farmer.fields.reduce((total, field) => total + field.size, 0).toFixed(1)} acres
                      </div>
                      <div className="text-white/60 text-sm">Land Size</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Dashboard Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Irrigation Schedule */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-400" />
                  {t('irrigationWindow')}
                </h3>
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-2">
                    6:00 AM - 10:00 AM
                  </div>
                  <div className="text-white/70">Optimal irrigation time for your field</div>
                </div>
              </GlassCard>

              {/* Weather Alert */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <CloudRain className="w-6 h-6 mr-3 text-orange-400" />
                  {t('weatherAlert')}
                </h3>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-400 mb-2">
                    Tomorrow 6:00 PM
                  </div>
                  <div className="text-white/70">Expected peak rainfall time</div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Daily Insights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Today's Personalized Insights
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-500/20 rounded-lg p-6 text-center"
                >
                  <Leaf className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-xl font-bold text-green-400 mb-2">Healthy Growth</div>
                  <div className="text-white/70">Your crops are showing excellent NDVI readings</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-500/20 rounded-lg p-6 text-center"
                >
                  <CloudRain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <div className="text-xl font-bold text-blue-400 mb-2">Moderate Rain Expected</div>
                  <div className="text-white/70">15mm rainfall expected. Adjust irrigation schedule accordingly</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-500/20 rounded-lg p-6 text-center"
                >
                  <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-xl font-bold text-purple-400 mb-2">Yield Prediction</div>
                  <div className="text-white/70">Based on current conditions, expect 12% higher yield this season</div>
                </motion.div>
              </div>

              {/* Field Details */}
              <div className="mt-8">
                <h4 className="text-xl font-bold text-white mb-4">Your Fields</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {farmer.fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="bg-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-semibold">
                          {isEnglish ? field.cropType : field.cropTypeTelugu}
                        </h5>
                        <span className="text-green-400 font-bold">
                          NDVI: {field.ndviValue.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-white/70 text-sm space-y-1">
                        <div>Size: {field.size} acres</div>
                        <div>Soil: {field.soilType}</div>
                        <div>Last Irrigation: {field.lastIrrigation.toLocaleDateString()}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default FarmerCompanion;