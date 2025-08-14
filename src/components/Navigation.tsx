import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Satellite, 
  CloudRain, 
  Shield, 
  Droplets, 
  User,
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import GlassCard from './GlassCard';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/satellite', icon: Satellite, label: t('satelliteDashboard') },
    { path: '/cyclone', icon: CloudRain, label: t('cycloneDefense') },
    { path: '/crop', icon: Shield, label: t('cropGuardian') },
    { path: '/water', icon: Droplets, label: t('waterSaver') },
    { path: '/farmer', icon: User, label: t('farmerCompanion') },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <GlassCard className="px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {t('heroTitle')}
            </h1>
          </motion.div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm hover:shadow-lg transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'తె' : 'EN'}</span>
            </motion.button>
          </div>
        </div>
      </GlassCard>
    </motion.nav>
  );
};

export default Navigation;