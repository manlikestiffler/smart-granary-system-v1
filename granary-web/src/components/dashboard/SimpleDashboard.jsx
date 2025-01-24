import React from 'react';
import { useChartConfig } from '@/hooks/useChartConfig.js';
import { useDataAggregation } from '@/hooks/useDataAggregation.js';
import { useSensorStats } from '@/hooks/useSensorStats.js';
import {
  Thermometer,
  Droplets,
  Warehouse,
  Info,
  AlertTriangle
} from 'lucide-react';
import SensorDetailModal from '../modals/SensorDetailModal';
import { cn } from '@/lib/utils';

function SimpleDashboard({ data, nextUpdateIn, historicalData }) {
  const [selectedSensor, setSelectedSensor] = useState(null);

  const getStatusColor = (value, type) => {
    switch(type) {
      case 'temperature':
        return value > 28 ? 'red' : value < 18 ? 'blue' : 'green';
      case 'humidity':
        return value > 65 ? 'red' : value < 35 ? 'orange' : 'green';
      case 'moisture':
        return value > 16 ? 'red' : value < 12 ? 'orange' : 'green';
      default:
        return 'black';
    }
  };

  const getStatusMessage = (value, type) => {
    switch(type) {
      case 'temperature':
        if (value > 28) return 'Too Hot!';
        if (value < 18) return 'Too Cold!';
        return 'Good';
      case 'humidity':
        if (value > 65) return 'Too Humid!';
        if (value < 35) return 'Too Dry!';
        return 'Good';
      case 'moisture':
        if (value > 16) return 'Too Wet!';
        if (value < 12) return 'Too Dry!';
        return 'Good';
      default:
        return 'Unknown';
    }
  };

  const formatTimeRemaining = (ms) => {
    const minutes = Math.floor(ms / 60000);
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const handleCardClick = (type) => {
    const sensorData = {
      name: type === 'temperature' ? 'Temperature' : 
            type === 'humidity' ? 'Humidity' : 'Grain Moisture',
      value: data[type],
      unit: type === 'temperature' ? '°C' : '%',
      color: getStatusColor(data[type], type),
      ranges: {
        min: type === 'temperature' ? 18 : type === 'humidity' ? 35 : 12,
        max: type === 'temperature' ? 28 : type === 'humidity' ? 65 : 16,
        optimal: type === 'temperature' ? 22 : type === 'humidity' ? 50 : 14
      }
    };

    const sensorHistory = historicalData.map(reading => ({
      timestamp: reading.timestamp,
      value: reading[type]
    }));

    setSelectedSensor({ ...sensorData, historicalData: sensorHistory });
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Grain Storage Monitor
              </h1>
              <p className="text-gray-500 mt-1">
                Real-time environmental conditions monitoring
              </p>
            </div>
            <div className="text-right bg-white/80 px-4 py-2 rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Last Updated: {new Date().toLocaleTimeString()}</p>
              <p className="text-gray-500 text-sm">Next Update: {formatTimeRemaining(nextUpdateIn)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Temperature Card */}
        <div 
          className={cn(
            "group relative bg-white/50 backdrop-blur-sm rounded-2xl transition-all duration-300",
            "hover:shadow-lg hover:scale-[1.02] cursor-pointer border border-gray-100",
            "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br",
            "before:from-transparent before:to-transparent before:opacity-0",
            "before:transition-opacity hover:before:opacity-100"
          )}
          onClick={() => handleCardClick('temperature')}
        >
          <div className={cn(
            "absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium",
            "transition-colors duration-300",
            getStatusColor(data.temperature, 'temperature') === 'red' ? 'bg-red-100/80 text-red-700' :
            getStatusColor(data.temperature, 'temperature') === 'blue' ? 'bg-blue-100/80 text-blue-700' :
            'bg-green-100/80 text-green-700'
          )}>
            {getStatusMessage(data.temperature, 'temperature')}
          </div>
          <div className="p-8 text-center relative z-10">
            <div className="inline-flex p-3 rounded-xl bg-gray-100/50 mb-6">
              <Thermometer className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Temperature</h3>
            <p className={cn(
              "text-5xl font-bold mb-4 transition-colors duration-300",
              getStatusColor(data.temperature, 'temperature') === 'red' ? 'text-red-600' :
              getStatusColor(data.temperature, 'temperature') === 'blue' ? 'text-blue-600' :
              'text-green-600'
            )}>
              {data.temperature}°C
            </p>
            <p className="text-gray-500 text-sm">Optimal Range: 18°C - 28°C</p>
          </div>
        </div>

        {/* Humidity Card */}
        <div 
          className={cn(
            "group relative bg-white/50 backdrop-blur-sm rounded-2xl transition-all duration-300",
            "hover:shadow-lg hover:scale-[1.02] cursor-pointer border border-gray-100",
            "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br",
            "before:from-transparent before:to-transparent before:opacity-0",
            "before:transition-opacity hover:before:opacity-100"
          )}
          onClick={() => handleCardClick('humidity')}
        >
          <div className={cn(
            "absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium",
            "transition-colors duration-300",
            getStatusColor(data.humidity, 'humidity') === 'red' ? 'bg-red-100/80 text-red-700' :
            'bg-green-100/80 text-green-700'
          )}>
            {getStatusMessage(data.humidity, 'humidity')}
          </div>
          <div className="p-8 text-center relative z-10">
            <div className="inline-flex p-3 rounded-xl bg-gray-100/50 mb-6">
              <Droplets className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Humidity</h3>
            <p className={cn(
              "text-5xl font-bold mb-4 transition-colors duration-300",
              getStatusColor(data.humidity, 'humidity') === 'red' ? 'text-red-600' :
              'text-green-600'
            )}>
              {data.humidity}%
            </p>
            <p className="text-gray-500 text-sm">Optimal Range: 35% - 65%</p>
          </div>
        </div>

        {/* Moisture Card */}
        <div 
          className={cn(
            "group relative bg-white/50 backdrop-blur-sm rounded-2xl transition-all duration-300",
            "hover:shadow-lg hover:scale-[1.02] cursor-pointer border border-gray-100",
            "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br",
            "before:from-transparent before:to-transparent before:opacity-0",
            "before:transition-opacity hover:before:opacity-100"
          )}
          onClick={() => handleCardClick('moisture')}
        >
          <div className={cn(
            "absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium",
            "transition-colors duration-300",
            getStatusColor(data.moisture, 'moisture') === 'red' ? 'bg-red-100/80 text-red-700' :
            'bg-green-100/80 text-green-700'
          )}>
            {getStatusMessage(data.moisture, 'moisture')}
          </div>
          <div className="p-8 text-center relative z-10">
            <div className="inline-flex p-3 rounded-xl bg-gray-100/50 mb-6">
              <Warehouse className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Grain Moisture</h3>
            <p className={cn(
              "text-5xl font-bold mb-4 transition-colors duration-300",
              getStatusColor(data.moisture, 'moisture') === 'red' ? 'text-red-600' :
              'text-green-600'
            )}>
              {data.moisture}%
            </p>
            <p className="text-gray-500 text-sm">Optimal Range: 12% - 16%</p>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className={cn(
        "mt-8 rounded-2xl backdrop-blur-sm border transition-colors duration-300",
        data.alerts?.length ? 'bg-red-50/50 border-red-100' : 'bg-white/50 border-gray-100'
      )}>
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-100/50">
              <Info className="w-5 h-5 text-gray-700" />
            </div>
            <span className="font-medium text-gray-900">System Status</span>
          </div>
          <div>
            {data.alerts && data.alerts.length > 0 ? (
              <div className="flex items-center space-x-3 text-red-600">
                <div className="p-2 rounded-lg bg-red-100/50">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="font-medium">{data.alerts[0].message}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-100/50">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-green-600 font-medium">All systems normal</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <SensorDetailModal
        visible={!!selectedSensor}
        onClose={() => setSelectedSensor(null)}
        sensorData={selectedSensor}
        historicalData={selectedSensor?.historicalData}
      />
    </div>
  );
}

export default SimpleDashboard; 