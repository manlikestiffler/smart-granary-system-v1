import { useMemo } from 'react';

export function useSensorAnalytics(data, sensorTypes) {
  return useMemo(() => {
    if (!data.length) return {};

    const analytics = {};

    Object.keys(sensorTypes).forEach(sensorKey => {
      const values = data.map(reading => reading[sensorKey]).filter(Boolean);
      if (!values.length) return;

      const sum = values.reduce((acc, val) => acc + val, 0);
      const mean = sum / values.length;
      const sortedValues = [...values].sort((a, b) => a - b);
      const median = sortedValues[Math.floor(values.length / 2)];

      const squareDiffs = values.map(value => {
        const diff = value - mean;
        return diff * diff;
      });
      const variance = squareDiffs.reduce((acc, val) => acc + val, 0) / values.length;
      const stdDev = Math.sqrt(variance);

      const changes = [];
      for (let i = 1; i < values.length; i++) {
        changes.push(values[i] - values[i - 1]);
      }
      const trend = changes.reduce((acc, val) => acc + val, 0) / changes.length;

      const ranges = sensorTypes[sensorKey].ranges;
      const outOfRange = values.filter(v => v < ranges.min || v > ranges.max);
      const outOfRangePercentage = (outOfRange.length / values.length) * 100;

      analytics[sensorKey] = {
        current: values[values.length - 1],
        min: Math.min(...values),
        max: Math.max(...values),
        mean,
        median,
        stdDev,
        trend,
        outOfRangePercentage,
        stability: 100 - (stdDev / mean) * 100,
        readings: values.length,
        lastUpdate: data[data.length - 1].timestamp
      };
    });

    return analytics;
  }, [data, sensorTypes]);
}