import { useState, useMemo } from 'react';

export function useDataFiltering(data, options = {}) {
  const [filters, setFilters] = useState({
    search: '',
    timeRange: null,
    sensorTypes: [],
    thresholds: 'all',
    zones: []
  });

  const filteredData = useMemo(() => {
    return data.filter(reading => {
      // Search filter
      if (filters.search) {
        const searchStr = filters.search.toLowerCase();
        const matchesSearch = Object.entries(reading).some(([key, value]) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchStr);
          }
          return false;
        });
        if (!matchesSearch) return false;
      }

      // Time range filter
      if (filters.timeRange) {
        const timestamp = new Date(reading.timestamp);
        if (timestamp < filters.timeRange[0] || timestamp > filters.timeRange[1]) {
          return false;
        }
      }

      // Sensor types filter
      if (filters.sensorTypes.length > 0) {
        const hasSelectedSensor = filters.sensorTypes.some(sensorType => 
          reading[sensorType] !== undefined
        );
        if (!hasSelectedSensor) return false;
      }

      // Threshold filter
      if (filters.thresholds !== 'all') {
        const matchesThreshold = Object.entries(reading).some(([key, value]) => {
          const sensor = options.sensorTypes?.[key];
          if (!sensor) return false;

          switch (filters.thresholds) {
            case 'warning':
              return value < sensor.ranges.min || value > sensor.ranges.max;
            case 'error':
              return value < sensor.ranges.min * 0.8 || value > sensor.ranges.max * 1.2;
            case 'normal':
              return value >= sensor.ranges.min && value <= sensor.ranges.max;
            default:
              return true;
          }
        });
        if (!matchesThreshold) return false;
      }

      // Zone filter
      if (filters.zones.length > 0 && !filters.zones.includes(reading.location)) {
        return false;
      }

      return true;
    });
  }, [data, filters, options.sensorTypes]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    filters,
    filteredData,
    updateFilters
  };
}