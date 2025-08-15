import { Farmer, WeatherAlert } from '../types';

export class AlertService {
  private static instance: AlertService;
  
  public static getInstance(): AlertService {
    if (!AlertService.instance) {
      AlertService.instance = new AlertService();
    }
    return AlertService.instance;
  }

  // Simulate SMS sending (replace with real Twilio/TextLocal integration)
  async sendSMSAlert(farmer: Farmer, alert: WeatherAlert): Promise<boolean> {
    try {
      console.log('📱 SMS Alert Sent:');
      console.log(`To: ${farmer.phone}`);
      console.log(`Message: ${farmer.language === 'te' ? alert.messageTelugu : alert.message}`);
      console.log(`Severity: ${alert.severity.toUpperCase()}`);
      console.log(`District: ${farmer.district}`);
      console.log('---');

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real implementation:
      /*
      const twilioClient = twilio(accountSid, authToken);
      await twilioClient.messages.create({
        body: farmer.language === 'te' ? alert.messageTelugu : alert.message,
        to: farmer.phone,
        from: '+1AGRIHELP'
      });
      */
      
      return true;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      return false;
    }
  }

  // Generate alerts based on conditions
  generateAlerts(farmers: Farmer[], conditions: any): WeatherAlert[] {
    const alerts: WeatherAlert[] = [];

    // Cyclone alerts
    if (conditions.cyclone && conditions.cyclone.windSpeed > 60) {
      alerts.push({
        id: `CYCLONE_${Date.now()}`,
        type: 'cyclone',
        severity: conditions.cyclone.windSpeed > 100 ? 'critical' : 'high',
        message: `Cyclone ${conditions.cyclone.name} approaching. Wind speed: ${conditions.cyclone.windSpeed} km/h. Take shelter immediately.`,
        messageTelugu: `తుఫాను ${conditions.cyclone.name} సమీపిస్తోంది. గాలి వేగం: ${conditions.cyclone.windSpeed} కి.మీ/గం. వెంటనే ఆశ్రయం తీసుకోండి.`,
        district: 'All',
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    }

    // Disease outbreak alerts
    if (conditions.diseaseRisk > 70) {
      alerts.push({
        id: `DISEASE_${Date.now()}`,
        type: 'disease',
        severity: 'high',
        message: `High disease risk detected for ${conditions.cropType}. Apply preventive measures immediately.`,
        messageTelugu: `${conditions.cropType} పంటకు వ్యాధి ప్రమాదం అధికంగా ఉంది. వెంటనే నివారణ చర్యలు తీసుకోండి.`,
        district: conditions.district,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      });
    }

    // Irrigation reminders
    alerts.push({
      id: `IRRIGATION_${Date.now()}`,
      type: 'rainfall',
      severity: 'medium',
      message: 'Optimal irrigation window: 6:00 AM - 10:00 AM. No rain expected for next 24 hours.',
      messageTelugu: 'అనుకూల నీటిపారుదల సమయం: ఉదయం 6:00 - 10:00. రాబోయే 24 గంటలలో వర్షం లేదు.',
      district: 'Krishna',
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    });

    return alerts;
  }

  // Broadcast alerts to relevant farmers
  async broadcastAlerts(alerts: WeatherAlert[], farmers: Farmer[]): Promise<void> {
    for (const alert of alerts) {
      const relevantFarmers = farmers.filter(farmer => 
        alert.district === 'All' || farmer.district === alert.district
      );

      for (const farmer of relevantFarmers) {
        if (this.shouldSendAlert(farmer, alert)) {
          await this.sendSMSAlert(farmer, alert);
        }
      }
    }
  }

  private shouldSendAlert(farmer: Farmer, alert: WeatherAlert): boolean {
    // Check farmer preferences
    if (!farmer.preferences.weatherAlerts && alert.type === 'cyclone') return false;
    if (!farmer.preferences.irrigationReminders && alert.type === 'rainfall') return false;
    
    // Check alert severity
    if (alert.severity === 'critical') return true;
    if (alert.severity === 'high' && farmer.preferences.alertTypes.includes('high')) return true;
    
    return farmer.preferences.alertTypes.includes(alert.severity);
  }
}

export const alertService = AlertService.getInstance();