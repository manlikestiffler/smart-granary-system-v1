const sensorRanges = {
  temperature: {
    min: 15,
    max: 30,
    optimal: 22,
    unit: '°C'
  },
  humidity: {
    min: 30,
    max: 70,
    optimal: 45,
    unit: '%'
  },
  moisture: {
    min: 12,
    max: 18,
    optimal: 14,
    unit: '%'
  },
  pestActivity: {
    min: 0,
    max: 10,
    critical: 5,
    unit: 'events/hr'
  },
  co2: {
    min: 350,
    max: 1000,
    optimal: 400,
    unit: 'ppm'
  },
  airflow: {
    min: 100,
    max: 500,
    optimal: 300,
    unit: 'm³/h'
  }
};

const generateInitialReadings = (count = 24) => {
  const readings = [];
  const now = Date.now();
  let lastReading = null;

  for (let i = 0; i < count; i++) {
    const reading = {
      id: i + 1,
      timestamp: new Date(now - (count - 1 - i) * 3600000).toISOString(),
      location: `Zone ${Math.floor(i / 6) + 1}`,
    };

    Object.entries(sensorRanges).forEach(([key, range]) => {
      const variation = (range.max - range.min) * 0.1;

      if (lastReading) {
        const prevValue = lastReading[key];
        const delta = (Math.random() - 0.5) * variation;
        let newValue = prevValue + delta;
        newValue = Math.max(range.min, Math.min(range.max, newValue));
        reading[key] = Number(newValue.toFixed(1));
      } else {
        const optimal = range.optimal || (range.max + range.min) / 2;
        reading[key] = Number((optimal + (Math.random() - 0.5) * variation).toFixed(1));
      }
    });

    readings.push(reading);
    lastReading = reading;
  }

  return readings;
};

export const seedData = {
  readings: generateInitialReadings(),
  alerts: [],
  settings: {
    thresholds: {
      temperature: {
        min: 15,
        max: 30,
        optimal: 22
      },
      humidity: {
        min: 30,
        max: 70,
        optimal: 45
      },
      moisture: {
        min: 12,
        max: 18,
        optimal: 14
      },
      pestActivity: {
        min: 0,
        max: 10,
        critical: 5
      }
    },
    notifications: {
      email: true,
      push: true,
      frequency: "immediate",
      quietHours: {
        enabled: false,
        start: "22:00",
        end: "06:00"
      }
    }
  },
  zones: [
    { id: 1, name: "Zone 1", active: true },
    { id: 2, name: "Zone 2", active: true },
    { id: 3, name: "Zone 3", active: true },
    { id: 4, name: "Zone 4", active: true }
  ]
}; 