import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  ThermometerIcon,
  Droplets,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  Clock,
  BarChart3,
  Battery,
  Cpu,
  Wifi,
  CheckCircle2,
  Server
} from 'lucide-react';
import SensorDetailModal from '../components/modals/SensorDetailModal';

// Static mock data with more entries
const mockData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(Date.now() - (23 - i) * 30 * 60000).toISOString(),
  temperature: 24 + Math.sin(i * 0.5) * 6,
  humidity: 55 + Math.cos(i * 0.5) * 15,
  moisture: 14 + Math.sin(i * 0.3) * 3,
})).map(reading => ({
  ...reading,
  temperatureStatus: reading.temperature > 28 ? 'critical' : reading.temperature > 26 ? 'warning' : 'normal',
  humidityStatus: reading.humidity > 65 ? 'critical' : reading.humidity > 60 ? 'warning' : 'normal',
  moistureStatus: reading.moisture > 16 ? 'critical' : reading.moisture > 15 ? 'warning' : 'normal'
}));

function Dashboard() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const lastReading = mockData[mockData.length - 1];

  const cards = [
    {
      title: 'Temperature',
      value: `${lastReading.temperature.toFixed(1)}°C`,
      icon: ThermometerIcon,
      status: lastReading.temperatureStatus,
      color: 'blue',
      data: mockData.map(d => ({ timestamp: d.timestamp, value: d.temperature })),
      unit: '°C',
      ranges: {
        min: 18,
        max: 28,
        optimal: 23
      },
      name: 'Temperature'
    },
    {
      title: 'Humidity',
      value: `${lastReading.humidity.toFixed(1)}%`,
      icon: Droplets,
      status: lastReading.humidityStatus,
      color: 'cyan',
      data: mockData.map(d => ({ timestamp: d.timestamp, value: d.humidity })),
      unit: '%',
      ranges: {
        min: 35,
        max: 65,
        optimal: 50
      },
      name: 'Humidity'
    },
    {
      title: 'Moisture',
      value: `${lastReading.moisture.toFixed(1)}%`,
      icon: Warehouse,
      status: lastReading.moistureStatus,
      color: 'emerald',
      data: mockData.map(d => ({ timestamp: d.timestamp, value: d.moisture })),
      unit: '%',
      ranges: {
        min: 12,
        max: 16,
        optimal: 14
      },
      name: 'Moisture'
    }
  ];

  // Add mock performance data
  const systemMetrics = {
    uptime: '99.9%',
    latency: '120ms',
    storage: '72%',
    network: '95%',
    battery: '85%',
    lastMaintenance: '2024-03-15'
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Storage Monitor</h1>
        <div className="flex items-center space-x-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date(lastReading.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedSensor(card)}
            className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer border-l-4 ${
              card.status === 'critical' ? 'border-red-500' :
              card.status === 'warning' ? 'border-yellow-500' :
              'border-green-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">{card.title}</p>
                <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
                <div className={`mt-2 inline-flex items-center space-x-1 text-sm ${
                  card.status === 'critical' ? 'text-red-500' :
                  card.status === 'warning' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {card.status === 'normal' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  <span className="capitalize">{card.status}</span>
                </div>
              </div>
              <card.icon className={`w-12 h-12 ${
                card.status === 'critical' ? 'text-red-500' :
                card.status === 'warning' ? 'text-yellow-500' :
                'text-green-500'
              }`} />
            </div>

            {/* Mini Sparkline */}
            <div className="h-16 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={card.data.slice(-12)}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      card.status === 'critical' ? '#ef4444' :
                      card.status === 'warning' ? '#f59e0b' :
                      '#22c55e'
                    }
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New System Performance Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">System Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Status Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">System Status</h3>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="font-semibold text-green-500">{systemMetrics.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Response Time</span>
                <span className="font-semibold">{systemMetrics.latency}</span>
              </div>
            </div>
          </div>

          {/* Storage & Network Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <Server className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-semibold">{systemMetrics.storage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 rounded-full h-2" 
                    style={{ width: systemMetrics.storage }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Network</span>
                  <span className="font-semibold">{systemMetrics.network}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 rounded-full h-2" 
                    style={{ width: systemMetrics.network }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* System Health Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">System Health</h3>
              <Battery className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Battery Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 w-24">
                    <div 
                      className="bg-indigo-500 rounded-full h-2" 
                      style={{ width: systemMetrics.battery }}
                    />
                  </div>
                  <span className="font-semibold">{systemMetrics.battery}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Maintenance</span>
                <span className="font-semibold">
                  {new Date(systemMetrics.lastMaintenance).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Cpu className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">CPU Usage</p>
              <p className="text-lg font-semibold">42%</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Wifi className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Signal Strength</p>
              <p className="text-lg font-semibold">Excellent</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Data Points</p>
              <p className="text-lg font-semibold">24.3K</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Server className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Active Sensors</p>
              <p className="text-lg font-semibold">12/12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Detail Modal */}
      <SensorDetailModal
        visible={!!selectedSensor}
        onClose={() => setSelectedSensor(null)}
        sensorData={{
          name: selectedSensor?.name || '',
          value: parseFloat(selectedSensor?.value) || 0,
          unit: selectedSensor?.unit || '',
          ranges: selectedSensor?.ranges || { min: 0, max: 100, optimal: 50 },
          historicalData: selectedSensor?.data || []
        }}
      />
    </div>
  );
}

export default Dashboard; 