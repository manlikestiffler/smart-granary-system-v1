import { useMemo } from 'react';

export function useSensorStats(data, selectedSensorKey) {
  return useMemo(() => {
    if (!data.length || !selectedSensorKey) return null;

    const values = data.map(reading => reading[selectedSensorKey]);
    const sum = values.reduce((acc, val) => acc + val, 0);

    return {
      current: values[values.length - 1],
      average: sum / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      trend: values.length > 1 
        ? values[values.length - 1] - values[values.length - 2]
        : 0
    };
  }, [data, selectedSensorKey]);
}
