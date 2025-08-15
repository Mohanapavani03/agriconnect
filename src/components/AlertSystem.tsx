import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Bell, Phone, MessageSquare } from 'lucide-react';
import { WeatherAlert } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { alertService } from '../services/alertService';
import GlassCard from './GlassCard';

const AlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const { farmer } = useAuth();
  const { language } = useLanguage();

  useEffect(() => {
    // Simulate receiving alerts
    const mockAlerts: WeatherAlert[] = [
      {
        id: 'alert_1',
        type: 'cyclone',
        severity: 'critical',
        message: 'Cyclone Vardah approaching. Wind speed: 85 km/h. Take shelter immediately.',
        messageTelugu: 'తుఫాను వర్దా సమీపిస్తోంది. గాలి వేగం: 85 కి.మీ/గం. వెంటనే ఆశ్రయం తీసుకోండి.',
        district: 'Krishna',
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        id: 'alert_2',
        type: 'disease',
        severity: 'high',
        message: 'High disease risk detected for Cotton. Apply preventive measures immediately.',
        messageTelugu: 'పత్తి పంటకు వ్యాధి ప్రమాదం అధికంగా ఉంది. వెంటనే నివారణ చర్యలు తీసుకోండి.',
        district: 'Guntur',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      },
      {
        id: 'alert_3',
        type: 'rainfall',
        severity: 'medium',
        message: 'Optimal irrigation window: 6:00 AM - 10:00 AM. No rain expected for next 24 hours.',
        messageTelugu: 'అనుకూల నీటిపారుదల సమయం: ఉదయం 6:00 - 10:00. రాబోయే 24 గంటలలో వర్షం లేదు.',
        district: 'Krishna',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      },
    ];

    setAlerts(mockAlerts);

    // Auto-show alerts for critical severity
    const criticalAlerts = mockAlerts.filter(alert => alert.severity === 'critical');
    if (criticalAlerts.length > 0) {
      setShowAlerts(true);
    }
  }, []);

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'from-green-500 to-emerald-500',
      medium: 'from-yellow-500 to-orange-500',
      high: 'from-orange-500 to-red-500',
      critical: 'from-red-500 to-red-700',
    };
    return colors[severity as keyof typeof colors] || colors.medium;
  };

  const getSeverityIcon = (type: string) => {
    const icons = {
      cyclone: AlertTriangle,
      disease: AlertTriangle,
      rainfall: Bell,
      drought: AlertTriangle,
    };
    return icons[type as keyof typeof icons] || AlertTriangle;
  };

  const handleSendSMS = async (alert: WeatherAlert) => {
    if (farmer) {
      const success = await alertService.sendSMSAlert(farmer, alert);
      if (success) {
        // Show success feedback
        console.log('SMS sent successfully');
      }
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const activeAlerts = alerts.filter(alert => new Date() < alert.expiresAt);

  return (
    <>
      {/* Alert Bell Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAlerts(!showAlerts)}
        className="fixed top-24 right-6 z-50 w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <Bell className="w-6 h-6 text-white" />
        {activeAlerts.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">{activeAlerts.length}</span>
          </motion.div>
        )}
      </motion.button>

      {/* Alert Panel */}
      <AnimatePresence>
        {showAlerts && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-24 right-6 z-40 w-96 max-h-[70vh] overflow-y-auto"
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-orange-400" />
                  Active Alerts
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAlerts(false)}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {activeAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60">No active alerts</p>
                  </div>
                ) : (
                  activeAlerts.map((alert, index) => {
                    const IconComponent = getSeverityIcon(alert.type);
                    return (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg bg-gradient-to-r ${getSeverityColor(alert.severity)} bg-opacity-20 border border-white/20`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="w-5 h-5 text-white" />
                            <span className="text-white font-semibold capitalize">
                              {alert.type} Alert
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                              alert.severity === 'critical' ? 'bg-red-500 text-white' :
                              alert.severity === 'high' ? 'bg-orange-500 text-white' :
                              alert.severity === 'medium' ? 'bg-yellow-500 text-black' :
                              'bg-green-500 text-white'
                            }`}>
                              {alert.severity}
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => dismissAlert(alert.id)}
                            className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <X className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>

                        <p className="text-white/90 text-sm mb-3">
                          {language === 'te' ? alert.messageTelugu : alert.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-white/60 text-xs">
                            {alert.district} • {alert.timestamp.toLocaleTimeString()}
                          </div>
                          
                          {farmer && (
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSendSMS(alert)}
                                className="flex items-center space-x-1 px-3 py-1 bg-blue-500/30 rounded-full text-xs text-white hover:bg-blue-500/50 transition-colors"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>SMS</span>
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AlertSystem;