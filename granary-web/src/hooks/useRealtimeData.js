import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const POLLING_INTERVAL = 5000;
const API_URL = '/api/logs';

export function useRealtimeData(historyDuration = 30 * 60 * 1000) {
  const [data, setData] = useState([]);
  const [lastReading, setLastReading] = useState(null);
  const [nextUpdateIn, setNextUpdateIn] = useState(POLLING_INTERVAL);
  const [error, setError] = useState(null);

  const getStatus = (value, type) => {
    const thresholds = {
      temperature: { warning: [15, 30], critical: [10, 35] },
      humidity: { warning: [30, 70], critical: [20, 80] },
      moisture: { warning: [10, 18], critical: [8, 20] }
    };

    const [minWarning, maxWarning] = thresholds[type].warning;
    const [minCritical, maxCritical] = thresholds[type].critical;

    if (value <= minCritical || value >= maxCritical) return 'critical';
    if (value <= minWarning || value >= maxWarning) return 'warning';
    return 'normal';
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      const now = new Date();
      const cutoff = new Date(now.getTime() - historyDuration);
      
      const recentData = response.data
        .filter(reading => new Date(reading.timestamp) > cutoff)
        .map(reading => ({
          ...reading,
          temperatureStatus: getStatus(reading.temperature, 'temperature'),
          humidityStatus: getStatus(reading.humidity, 'humidity'),
          moistureStatus: getStatus(reading.moisture, 'moisture')
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setData(recentData);
      if (recentData.length > 0) {
        setLastReading(recentData[recentData.length - 1]);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching sensor data:', err);
    }
  }, [historyDuration]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let interval = setInterval(fetchData, POLLING_INTERVAL);
    let countdown = setInterval(() => {
      setNextUpdateIn(prev => {
        if (prev <= 1000) return POLLING_INTERVAL;
        return prev - 1000;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [fetchData]);

  return {
    data,
    lastReading,
    nextUpdateIn,
    error,
    refetch: fetchData
  };
} 