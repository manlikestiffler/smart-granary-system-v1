export class MockWebSocket {
  constructor(url, options = {}) {
    this.url = url;
    this.options = {
      ...options,
      interval: options.interval || 30 * 60 * 1000, // Exactly 30 minutes
      maxRetries: options.maxRetries || 5,
      retryDelay: options.retryDelay || 5000
    };
    this.listeners = new Map();
    this.readyState = 0; // CONNECTING
    this.retryCount = 0;
    this.dataInterval = null;
    this.simulateConnection();
  }

  simulateConnection() {
    // Clear any existing intervals
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
      this.dataInterval = null;
    }

    // Simulate successful connection after a short delay
    setTimeout(() => {
      if (this.retryCount < this.options.maxRetries) {
        this.readyState = 1; // OPEN
        this.retryCount = 0; // Reset retry count on successful connection
        this.dispatchEvent('open');
        this.startDataSimulation();
      } else {
        this.readyState = 3; // CLOSED
        this.dispatchEvent('close');
      }
    }, 100);
  }

  startDataSimulation() {
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
    }

    // Calculate time until next 30-minute mark
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const timeToNext30Min = (
      (30 - (minutes % 30)) * 60 * 1000 - // Minutes to next 30
      seconds * 1000 - // Remove seconds
      milliseconds // Remove milliseconds
    );

    // First update at next 30-minute mark
    setTimeout(() => {
      if (this.readyState === 1) {
        this.sendMockData();
        
        // Then set up regular 30-minute interval
        this.dataInterval = setInterval(() => {
          if (this.readyState === 1) {
            this.sendMockData();
          }
        }, 30 * 60 * 1000); // Exactly 30 minutes
      }
    }, timeToNext30Min);
  }

  sendMockData() {
    const mockData = {
      type: 'sensorData',
      timestamp: new Date().toISOString(),
      data: {
        // More stable readings with smaller variations
        temperature: Math.round((22 + Math.random() * 2) * 10) / 10, // 22-24°C
        humidity: Math.round((50 + Math.random() * 5) * 10) / 10,   // 50-55%
        moisture: Math.round((13.5 + Math.random() * 1) * 10) / 10  // 13.5-14.5%
      }
    };

    this.dispatchEvent('message', { data: JSON.stringify(mockData) });
  }

  addEventListener(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type).add(callback);
  }

  removeEventListener(type, callback) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).delete(callback);
    }
  }

  dispatchEvent(type, event) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error('Error in WebSocket event handler:', error);
        }
      });
    }
  }

  send(data) {
    if (this.readyState === 1) {
      // Simulate acknowledgment
      setTimeout(() => {
        this.dispatchEvent('message', {
          data: JSON.stringify({ type: 'ack', id: Date.now() })
        });
      }, 50);
    }
  }

  close() {
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
      this.dataInterval = null;
    }
    this.readyState = 3; // CLOSED
    this.dispatchEvent('close');
  }
} 