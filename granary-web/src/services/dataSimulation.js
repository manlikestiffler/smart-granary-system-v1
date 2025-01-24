import { sensorTypes } from '../theme/sensorTypes';

class DataSimulator {
  constructor(updateInterval = 5000) {
    this.updateInterval = updateInterval;
    this.subscribers = new Set();
    this.intervalId = null;
  }

  generateReading(prevReading = null) {
    const now = new Date();
    const baseReading = {
      id: now.getTime(),
      timestamp: now.toISOString(),
    };

    Object.entries(sensorTypes).forEach(([key, sensor]) => {
      const range = sensor.ranges;
      const variation = (range.max - range.min) * 0.1; // 10% variation

      if (prevReading) {
        // Generate value with smooth transition
        const prevValue = prevReading[key];
        const delta = (Math.random() - 0.5) * variation;
        let newValue = prevValue + delta;

        // Keep within bounds
        newValue = Math.max(range.min, Math.min(range.max, newValue));
        baseReading[key] = Number(newValue.toFixed(1));
      } else {
        // Generate initial value near optimal
        const optimal = range.optimal || (range.max + range.min) / 2;
        baseReading[key] = Number((optimal + (Math.random() - 0.5) * variation).toFixed(1));
      }
    });

    return baseReading;
  }

  start() {
    if (this.intervalId) return;

    let lastReading = null;
    const updateReadings = () => {
      lastReading = this.generateReading(lastReading);
      this.subscribers.forEach(callback => callback(lastReading));
    };

    // Initial reading
    updateReadings();
    this.intervalId = setInterval(updateReadings, this.updateInterval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
}

export const dataSimulator = new DataSimulator(); 