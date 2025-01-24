import { sensorTypes } from '../theme/sensorTypes';

const generateReading = (prevReading = null) => {
  const now = new Date();
  const reading = {
    id: now.getTime(),
    timestamp: now.toISOString(),
  };

  Object.entries(sensorTypes).forEach(([key, sensor]) => {
    const range = sensor.ranges;
    const variation = (range.max - range.min) * 0.1;

    if (prevReading) {
      const prevValue = prevReading[key];
      const delta = (Math.random() - 0.5) * variation;
      let newValue = prevValue + delta;
      newValue = Math.max(range.min, Math.min(range.max, newValue));
      reading[key] = Number(newValue.toFixed(1));
    } else {
      const optimal = range.optimal || (range.max + range.min) / 2;
      reading[key] = Number((optimal + (Math.random() - 0.5) * variation).toFixed(1));
    }
  });

  return reading;
};

const generateMockData = (hours = 24) => {
  const data = [];
  let lastReading = null;

  for (let i = 0; i < hours; i++) {
    lastReading = generateReading(lastReading);
    lastReading.timestamp = new Date(Date.now() - (hours - 1 - i) * 3600000).toISOString();
    lastReading.location = `Zone ${Math.floor(i / 6) + 1}`;
    data.push({ ...lastReading });
  }

  return data;
};

export const generateAlert = (type, value, location) => {
  const ranges = sensorTypes[type].ranges;
  const isHigh = value > ranges.max;
  const isLow = value < ranges.min;
  
  if (!isHigh && !isLow) return null;

  return {
    id: Date.now(),
    type: isHigh ? 'error' : 'warning',
    sensorType: type,
    value,
    unit: sensorTypes[type].unit,
    message: `${sensorTypes[type].name} ${isHigh ? 'too high' : 'too low'}: ${value}${sensorTypes[type].unit}`,
    location,
    timestamp: new Date().toISOString(),
    status: 'active'
  };
};

export const mockData = generateMockData(); 