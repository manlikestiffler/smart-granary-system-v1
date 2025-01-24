import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ThermometerIcon,
  Droplets,
  Warehouse,
  Clock,
  Download,
  Search,
  Filter,
  Calendar,
  ArrowUpDown
} from 'lucide-react';

// Extended mock data
const mockLogs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  temperature: 24 + Math.sin(i * 0.5) * 6,
  humidity: 55 + Math.cos(i * 0.5) * 15,
  moisture: 14 + Math.sin(i * 0.3) * 3,
  location: `Zone ${String.fromCharCode(65 + (i % 3))}`, // Zones A, B, C
  status: i % 5 === 0 ? 'critical' : i % 3 === 0 ? 'warning' : 'normal'
})).map(log => ({
  ...log,
  temperatureStatus: log.temperature > 28 ? 'critical' : log.temperature > 26 ? 'warning' : 'normal',
  humidityStatus: log.humidity > 65 ? 'critical' : log.humidity > 60 ? 'warning' : 'normal',
  moistureStatus: log.moisture > 16 ? 'critical' : log.moisture > 15 ? 'warning' : 'normal'
}));

function DataLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Filter logs based on search and filters
  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = 
      log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.temperature.toString().includes(searchTerm) ||
      log.humidity.toString().includes(searchTerm) ||
      log.moisture.toString().includes(searchTerm);
    
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || log.location === selectedLocation;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  const exportData = () => {
    const csv = [
      ['Timestamp', 'Temperature (°C)', 'Humidity (%)', 'Moisture (%)', 'Location', 'Status'].join(','),
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.temperature.toFixed(1),
        log.humidity.toFixed(1),
        log.moisture.toFixed(1),
        log.location,
        log.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sensor-logs.csv';
    a.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Title and Export */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sensor Logs</h1>
        <button
          onClick={exportData}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="normal">Normal</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="all">All Locations</option>
          <option value="Zone A">Zone A</option>
          <option value="Zone B">Zone B</option>
          <option value="Zone C">Zone C</option>
        </select>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl shadow-sm p-4 border-l-4 ${
              log.status === 'critical' ? 'border-red-500' :
              log.status === 'warning' ? 'border-yellow-500' :
              'border-green-500'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Timestamp and Location */}
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Timestamp</p>
                  <p className="font-medium">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>

              {/* Temperature */}
              <div className="flex items-center space-x-3">
                <ThermometerIcon className={`w-5 h-5 ${
                  log.temperatureStatus === 'critical' ? 'text-red-500' :
                  log.temperatureStatus === 'warning' ? 'text-yellow-500' :
                  'text-green-500'
                }`} />
                <div>
                  <p className="text-sm text-gray-500">Temperature</p>
                  <p className="font-medium">{log.temperature.toFixed(1)}°C</p>
                </div>
              </div>

              {/* Humidity */}
              <div className="flex items-center space-x-3">
                <Droplets className={`w-5 h-5 ${
                  log.humidityStatus === 'critical' ? 'text-red-500' :
                  log.humidityStatus === 'warning' ? 'text-yellow-500' :
                  'text-green-500'
                }`} />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-medium">{log.humidity.toFixed(1)}%</p>
                </div>
              </div>

              {/* Moisture */}
              <div className="flex items-center space-x-3">
                <Warehouse className={`w-5 h-5 ${
                  log.moistureStatus === 'critical' ? 'text-red-500' :
                  log.moistureStatus === 'warning' ? 'text-yellow-500' :
                  'text-green-500'
                }`} />
                <div>
                  <p className="text-sm text-gray-500">Moisture</p>
                  <p className="font-medium">{log.moisture.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* Location Badge */}
            <div className="mt-2 flex justify-end">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {log.location}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DataLogs; 