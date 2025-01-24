import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Gauge,
  Users,
  Network,
  Mail,
  Save,
  RotateCcw,
  Sliders,
  Wifi,
  HardDrive,
  AlertTriangle,
  ThermometerIcon,
  Droplets,
  Warehouse,
  XCircle
} from 'lucide-react';

function InfoCard({ title, description, recommendations, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Info Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">View Guidelines</span>
      </button>

      {/* Popup Card */}
      {isOpen && (
        <div className="absolute z-50 top-8 right-0 w-80 bg-white rounded-lg shadow-lg border border-blue-100 animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-blue-50 rounded-t-lg border-b border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">{title}</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-gray-600">{description}</p>
            
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Recommended Settings:</h5>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    </div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const sensorInfo = {
  temperature: {
    title: "Temperature Control",
    description: "Monitors ambient temperature to prevent grain spoilage and maintain optimal storage conditions.",
    recommendations: [
      "Keep between 18°C - 28°C for most grains",
      "Avoid rapid temperature changes",
      "Monitor daily for seasonal adjustments"
    ]
  },
  humidity: {
    title: "Humidity Management",
    description: "Tracks air moisture levels to prevent mold growth and maintain grain quality.",
    recommendations: [
      "Maintain between 35% - 65% relative humidity",
      "Lower humidity for longer storage",
      "Check regularly during wet seasons"
    ]
  },
  moisture: {
    title: "Grain Moisture Content",
    description: "Measures the internal moisture of stored grain to ensure safe storage conditions.",
    recommendations: [
      "Keep between 12% - 16% for most grains",
      "Adjust based on grain type",
      "Monitor more frequently during first month of storage"
    ]
  },
  grainLevel: {
    title: "Storage Capacity",
    description: "Monitors grain quantity and storage utilization to optimize inventory management.",
    recommendations: [
      "Maintain minimum 10% buffer space",
      "Don't exceed 90% capacity for proper aeration",
      "Consider seasonal storage patterns"
    ]
  }
};

function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    criticalAlerts: true,
    weeklyReports: true
  });

  const [thresholds, setThresholds] = useState({
    temperature: { min: 18, max: 28 },
    humidity: { min: 35, max: 65 },
    moisture: { min: 12, max: 16 },
    grainLevel: { min: 10, max: 90 }
  });

  const [system, setSystem] = useState({
    dataRetention: 90,
    backupFrequency: 'daily',
    autoUpdate: true,
    maintenanceMode: false
  });

  const saveSettings = () => {
    // Save settings logic here
    console.log('Settings saved');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 mt-1">Configure system preferences and thresholds</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-gray-600 bg-white border rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={saveSettings}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor Thresholds */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Gauge className="w-6 h-6 text-blue-500" />
              <h2 className="text-lg font-semibold">Sensor Thresholds</h2>
            </div>
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
          </div>

          <div className="space-y-8">
            {/* Temperature Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <ThermometerIcon className="w-5 h-5 text-blue-500" />
                    <h3 className="font-medium">Temperature Range (°C)</h3>
                  </div>
                  <InfoCard
                    title={sensorInfo.temperature.title}
                    description={sensorInfo.temperature.description}
                    recommendations={sensorInfo.temperature.recommendations}
                    icon={ThermometerIcon}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                    <input
                      type="number"
                      value={thresholds.temperature.min}
                      onChange={(e) => setThresholds(prev => ({
                        ...prev,
                        temperature: { ...prev.temperature, min: parseFloat(e.target.value) }
                      }))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                    <input
                      type="number"
                      value={thresholds.temperature.max}
                      onChange={(e) => setThresholds(prev => ({
                        ...prev,
                        temperature: { ...prev.temperature, max: parseFloat(e.target.value) }
                      }))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${
                    thresholds.temperature.max <= 28 && thresholds.temperature.min >= 18
                      ? 'bg-green-500'
                      : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm text-gray-600">
                    Current: {thresholds.temperature.min}°C - {thresholds.temperature.max}°C
                  </span>
                </div>
              </div>
            </div>

            {/* Humidity Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Humidity Range (%)</h3>
                </div>
                <InfoCard
                  title={sensorInfo.humidity.title}
                  description={sensorInfo.humidity.description}
                  recommendations={sensorInfo.humidity.recommendations}
                  icon={Droplets}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                  <input
                    type="number"
                    value={thresholds.humidity.min}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      humidity: { ...prev.humidity, min: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                  <input
                    type="number"
                    value={thresholds.humidity.max}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      humidity: { ...prev.humidity, max: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  thresholds.humidity.max <= 65 && thresholds.humidity.min >= 35
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`} />
                <span className="text-sm text-gray-600">
                  Current: {thresholds.humidity.min}% - {thresholds.humidity.max}%
                </span>
              </div>
            </div>

            {/* Moisture Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Warehouse className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Grain Moisture Content (%)</h3>
                </div>
                <InfoCard
                  title={sensorInfo.moisture.title}
                  description={sensorInfo.moisture.description}
                  recommendations={sensorInfo.moisture.recommendations}
                  icon={Warehouse}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                  <input
                    type="number"
                    value={thresholds.moisture.min}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      moisture: { ...prev.moisture, min: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                  <input
                    type="number"
                    value={thresholds.moisture.max}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      moisture: { ...prev.moisture, max: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  thresholds.moisture.max <= 16 && thresholds.moisture.min >= 12
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`} />
                <span className="text-sm text-gray-600">
                  Current: {thresholds.moisture.min}% - {thresholds.moisture.max}%
                </span>
              </div>
            </div>

            {/* Grain Level Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Storage Capacity (%)</h3>
                </div>
                <InfoCard
                  title={sensorInfo.grainLevel.title}
                  description={sensorInfo.grainLevel.description}
                  recommendations={sensorInfo.grainLevel.recommendations}
                  icon={Database}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Alert Level</label>
                  <input
                    type="number"
                    value={thresholds.grainLevel.min}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      grainLevel: { ...prev.grainLevel, min: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                  <input
                    type="number"
                    value={thresholds.grainLevel.max}
                    onChange={(e) => setThresholds(prev => ({
                      ...prev,
                      grainLevel: { ...prev.grainLevel, max: parseFloat(e.target.value) }
                    }))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  thresholds.grainLevel.max <= 90 && thresholds.grainLevel.min >= 10
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`} />
                <span className="text-sm text-gray-600">
                  Current: {thresholds.grainLevel.min}% - {thresholds.grainLevel.max}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            {/* More notification toggles */}
            {/* ... */}
          </div>
        </div>

        {/* System Configuration */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Sliders className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">System Configuration</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Data Retention Period (days)</label>
              <select
                value={system.dataRetention}
                onChange={(e) => setSystem(prev => ({ ...prev, dataRetention: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
                <option value={180}>180 days</option>
              </select>
            </div>

            {/* More system settings */}
            {/* ... */}
          </div>
        </div>

        {/* Network Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Network className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Network Configuration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">API Endpoint</label>
              <input
                type="text"
                placeholder="https://api.example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* More network settings */}
            {/* ... */}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-100">
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-700">Reset System</p>
              <p className="text-sm text-red-600">This will reset all settings to default</p>
            </div>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 