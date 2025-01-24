import React, { createContext, useContext, useState } from 'react';
import { sensorTypes } from '../theme/sensorTypes';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    thresholds: Object.fromEntries(
      Object.entries(sensorTypes).map(([key, sensor]) => [
        key,
        {
          min: sensor.ranges.min,
          max: sensor.ranges.max,
          optimal: sensor.ranges.optimal
        }
      ])
    ),
    notifications: {
      email: true,
      push: true,
      frequency: 'immediate',
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '06:00'
      }
    },
    display: {
      theme: 'light',
      chartPeriod: '24h',
      refreshInterval: 5000, // 5 seconds
    },
    zones: [
      { id: 1, name: 'Zone 1', active: true },
      { id: 2, name: 'Zone 2', active: true },
      { id: 3, name: 'Zone 3', active: true },
      { id: 4, name: 'Zone 4', active: true },
    ]
  });

  const updateSettings = (newSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext); 