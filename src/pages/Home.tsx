import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Satellite, 
  CloudRain, 
  Shield, 
  Droplets, 
  User,
  TrendingUp,
  Globe2,
  Zap
} from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../contexts/LanguageContext';
import { MEDIA_URLS } from '../constants/media';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Satellite,
      title: t('satelliteDashboard'),
      description: 'Real-time NDVI monitoring with NASA satellite data',
      path: '/satellite',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: CloudRain,
      title: t('cycloneDefense'),
      description: '48-hour weather forecasting and cyclone tracking',
      path: '/cyclone',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Shield,
      title: t('cropGuardian'),
      description: 'AI-powered crop disease risk assessment',
      path: '/crop',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Droplets,
      title: t('waterSaver'),
      description: 'Intelligent irrigation scheduling and water management',
      path: '/water',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: User,
      title: t('farmerCompanion'),
      description: 'Personalized farmer dashboard with actionable insights',
      path: '/farmer',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { value: '500K+', label: 'Farmers Connected', icon: User },
    { value: '1.2M', label: 'Acres Monitored', icon: Globe2 },
    { value: '95%', label: 'Accuracy Rate', icon: TrendingUp },
    { value: '24/7', label: 'Real-time Data', icon: Zap },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <VideoBackground
        videoUrl={MEDIA_URLS.heroVideo}
        className="h-screen flex items-center justify-center"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('heroTitle')}
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
              {t('heroSubtitle')}
            </p>
            
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              {t('heroDescription')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/satellite"
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300"
                >
                  <span>{t('getStarted')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="flex items-center space-x-3 px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                  <span>{t('learnMore')}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </VideoBackground>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-center">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Agricultural Solutions
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Harness the power of NASA satellite data and AI to transform your farming operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.path}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={feature.path}>
                  <GlassCard className="p-8 h-full group cursor-pointer">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors duration-300">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;