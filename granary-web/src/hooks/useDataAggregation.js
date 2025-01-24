import { useMemo } from 'react';

export function useDataAggregation(data, interval = 'hour') {
  return useMemo(() => {
    if (!data.length) return [];

    const aggregatedData = {};

    data.forEach(reading => {
      const date = new Date(reading.timestamp);
      let key;

      switch (interval) {
        case 'minute':
          key = new Date(date.setSeconds(0)).toISOString();
          break;
        case 'hour':
          key = new Date(date.setMinutes(0, 0, 0)).toISOString();
          break;
        case 'day':
          key = new Date(date.setHours(0, 0, 0, 0)).toISOString();
          break;
        default:
          key = new Date(date.setMinutes(0, 0, 0)).toISOString();
      }

      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          timestamp: key,
          temperature: [],
          humidity: [],
          moisture: [],
          count: 0
        };
      }

      aggregatedData[key].temperature.push(reading.temperature);
      aggregatedData[key].humidity.push(reading.humidity);
      aggregatedData[key].moisture.push(reading.moisture);
      aggregatedData[key].count++;
    });

    return Object.values(aggregatedData).map(group => ({
      timestamp: group.timestamp,
      temperature: average(group.temperature),
      humidity: average(group.humidity),
      moisture: average(group.moisture),
      readings: group.count
    }));
  }, [data, interval]);
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
