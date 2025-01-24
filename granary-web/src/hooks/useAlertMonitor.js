import { useState, useEffect } from 'react';
import { sensorTypes } from '../theme/sensorTypes';

export function useAlertMonitor(data, threshold = 0.8) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!data.length) return;
    
    const latestReading = data[data.length - 1];
    const newAlerts = [];

    Object.entries(sensorTypes).forEach(([key, sensor]) => {
      const value = latestReading[key];
      const range = sensor.ranges;
      const maxThreshold = range.max * threshold;
      const minThreshold = range.min + (range.max - range.min) * (1 - threshold);

      if (value > maxThreshold || value < minThreshold) {
        newAlerts.push({
          id: Date.now(),
          type: value > maxThreshold ? 'error' : 'warning',
          sensorType: key,
          value,
          timestamp: latestReading.timestamp,
          message: `${sensor.name} ${value > maxThreshold ? 'too high' : 'too low'}: ${value}${sensor.unit}`,
        });
      }
    });

    if (newAlerts.length) {
      setAlerts(prev => [...prev, ...newAlerts]);
    }
  }, [data, threshold]);

  return alerts;
}
