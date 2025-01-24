import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ThermometerIcon,
  Droplets,
  Warehouse,
  Clock,
  Bell,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';

// Extended mock alerts with more variety
const mockAlerts = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    type: "temperature",
    severity: "critical",
    message: "Temperature exceeded critical threshold",
    value: 29.2,
    threshold: 28,
    status: "active",
    location: "Zone A - Silo 1",
    duration: "15 minutes",
    recommendations: [
      "Check ventilation system",
      "Verify cooling system operation",
      "Inspect for heat sources",
      "Adjust cooling parameters",
      "Monitor adjacent zones"
    ],
    details: {
      equipmentStatus: "Cooling system active",
      lastMaintenance: "2024-03-15",
      normalRange: "18-26°C",
      affectedArea: "Upper section",
      temperatureGradient: "26.5°C - 29.2°C",
      potentialImpact: [
        "Grain quality degradation",
        "Increased moisture migration",
        "Pest activity risk"
      ],
      systemResponse: [
        "Automated fan activation",
        "Increased airflow",
        "Temperature logging frequency increased"
      ]
    }
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    type: "humidity",
    severity: "warning",
    message: "Humidity levels rising rapidly",
    value: 68,
    threshold: 65,
    status: "active",
    location: "Zone B - Silo 2",
    duration: "10 minutes",
    recommendations: [
      "Activate dehumidification system",
      "Check for water leaks",
      "Ensure proper air circulation",
      "Monitor weather conditions",
      "Inspect roof seals"
    ],
    details: {
      systemStatus: "Dehumidifier active",
      lastCalibration: "2024-03-16",
      normalRange: "35-60%",
      affectedArea: "Middle section",
      humidityTrend: "Rising (+2%/hour)",
      weatherConditions: "Recent rainfall",
      potentialIssues: [
        "Condensation risk",
        "Mold development",
        "Reduced grain quality"
      ],
      preventiveMeasures: [
        "Continuous monitoring",
        "Automated ventilation",
        "Regular inspection schedule"
      ]
    }
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    type: "moisture",
    severity: "critical",
    message: "Grain moisture content critically high",
    value: 19.2,
    threshold: 16,
    status: "active",
    location: "Zone A - Silo 1",
    duration: "25 minutes",
    recommendations: [
      "Activate emergency ventilation system",
      "Check for water infiltration",
      "Inspect roof and seals for leaks",
      "Consider grain rotation if levels persist",
      "Monitor temperature for potential heat spots"
    ],
    details: {
      grainType: "Wheat",
      storageConditions: "Indoor Silo",
      lastInspection: "2024-03-18",
      normalRange: "12-16%",
      affectedVolume: "~20 tons",
      potentialRisks: [
        "Mold growth",
        "Quality degradation",
        "Storage life reduction"
      ]
    }
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    type: "moisture",
    severity: "warning",
    message: "Moisture gradient detected in storage",
    value: 15.8,
    threshold: 16,
    status: "active",
    location: "Zone B - Silo 2",
    duration: "40 minutes",
    recommendations: [
      "Check aeration system",
      "Verify moisture sensor calibration",
      "Monitor grain temperature",
      "Review storage conditions",
      "Schedule routine inspection"
    ],
    details: {
      grainType: "Corn",
      storageConditions: "Climate Controlled",
      lastInspection: "2024-03-17",
      normalRange: "13-15%",
      affectedVolume: "~15 tons",
      gradientRange: "13.2% - 15.8%"
    }
  },
  {
    id: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    type: "moisture",
    severity: "resolved",
    message: "Grain moisture content normalized",
    value: 14.2,
    threshold: 16,
    status: "resolved",
    location: "Zone C - Silo 3",
    duration: "45 minutes",
    resolvedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    resolution: "Automatic system adjustment successful",
    recommendations: [
      "Continue monitoring",
      "Document resolution steps",
      "Update maintenance log",
      "Schedule follow-up inspection"
    ],
    details: {
      grainType: "Soybeans",
      storageConditions: "Controlled Environment",
      resolutionMethod: "Automated ventilation",
      initialValue: "17.2%",
      finalValue: "14.2%",
      preventiveMeasures: [
        "Regular sensor calibration",
        "Improved sealing",
        "Enhanced monitoring"
      ]
    }
  }
  // Add more mock alerts as needed
];

function Alerts() {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Alert statistics
  const stats = {
    total: mockAlerts.length,
    critical: mockAlerts.filter(a => a.severity === 'critical').length,
    warning: mockAlerts.filter(a => a.severity === 'warning').length,
    resolved: mockAlerts.filter(a => a.status === 'resolved').length
  };

  // Filter alerts
  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = 
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getAlertIcon = (type) => {
    switch (type) {
      case 'temperature': return ThermometerIcon;
      case 'humidity': return Droplets;
      case 'moisture': return Warehouse;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">System Alerts</h1>
          <p className="text-gray-500 mt-1">Monitor and manage system alerts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{stats.total} Total Alerts</span>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Alerts</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Critical</p>
              <p className="text-2xl font-bold text-red-500">{stats.critical}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Warnings</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.warning}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-green-500">{stats.resolved}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search alerts..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Alerts</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const isExpanded = expandedAlert === alert.id;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-white rounded-xl shadow-sm border-l-4 ${
                  alert.status === 'resolved' ? 'border-green-500' :
                  alert.severity === 'critical' ? 'border-red-500' : 'border-yellow-500'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        alert.status === 'resolved' ? 'bg-green-100 text-green-600' :
                        alert.severity === 'critical' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{alert.message}</h3>
                        <div className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
                          <span>{alert.location}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(alert.timestamp).toLocaleString()}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {alert.status === 'resolved' && (
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                          Resolved
                        </span>
                      )}
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      {/* Alert Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-xl">
                        {/* Basic Information Card */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 text-blue-500" />
                            Alert Information
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Status</span>
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                alert.status === 'resolved' ? 'bg-green-100 text-green-700' :
                                alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Current Value</span>
                              <span className="font-medium">
                                {alert.value}{alert.type === 'temperature' ? '°C' : '%'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Threshold</span>
                              <span className="font-medium">
                                {alert.threshold}{alert.type === 'temperature' ? '°C' : '%'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Duration</span>
                              <span className="font-medium">{alert.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* System Details Card */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            {alert.type === 'temperature' && <ThermometerIcon className="w-5 h-5 mr-2 text-blue-500" />}
                            {alert.type === 'humidity' && <Droplets className="w-5 h-5 mr-2 text-blue-500" />}
                            {alert.type === 'moisture' && <Warehouse className="w-5 h-5 mr-2 text-blue-500" />}
                            System Details
                          </h4>
                          <div className="space-y-3">
                            {alert.type === 'temperature' && (
                              <>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                  <span className="text-gray-600">Equipment Status</span>
                                  <span className="font-medium">{alert.details.equipmentStatus}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                  <span className="text-gray-600">Last Maintenance</span>
                                  <span className="font-medium">{alert.details.lastMaintenance}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600">Temperature Range</span>
                                  <span className="font-medium">{alert.details.temperatureGradient}</span>
                                </div>
                              </>
                            )}
                            {alert.type === 'humidity' && (
                              <>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                  <span className="text-gray-600">System Status</span>
                                  <span className="font-medium">{alert.details.systemStatus}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                  <span className="text-gray-600">Last Calibration</span>
                                  <span className="font-medium">{alert.details.lastCalibration}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600">Humidity Trend</span>
                                  <span className="font-medium">{alert.details.humidityTrend}</span>
                                </div>
                              </>
                            )}
                            {alert.type === 'moisture' && (
                              <>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                  <span className="text-gray-600">Grain Type</span>
                                  <span className="font-medium">{alert.details.grainType}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                  <span className="text-gray-600">Storage Conditions</span>
                                  <span className="font-medium">{alert.details.storageConditions}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600">Affected Volume</span>
                                  <span className="font-medium">{alert.details.affectedVolume}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Impact & Response Card */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 text-blue-500" />
                            Impact & Response
                          </h4>
                          <div className="space-y-4">
                            {alert.type === 'temperature' && (
                              <>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-600 mb-2">Potential Impact</h5>
                                  <ul className="list-disc list-inside space-y-1 text-sm">
                                    {alert.details.potentialImpact.map((impact, idx) => (
                                      <li key={idx} className="text-gray-700">{impact}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-600 mb-2">System Response</h5>
                                  <ul className="list-disc list-inside space-y-1 text-sm">
                                    {alert.details.systemResponse.map((response, idx) => (
                                      <li key={idx} className="text-gray-700">{response}</li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            )}
                            {alert.type === 'humidity' && (
                              <>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-600 mb-2">Potential Issues</h5>
                                  <ul className="list-disc list-inside space-y-1 text-sm">
                                    {alert.details.potentialIssues.map((issue, idx) => (
                                      <li key={idx} className="text-gray-700">{issue}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-600 mb-2">Preventive Measures</h5>
                                  <ul className="list-disc list-inside space-y-1 text-sm">
                                    {alert.details.preventiveMeasures.map((measure, idx) => (
                                      <li key={idx} className="text-gray-700">{measure}</li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            )}
                            {alert.type === 'moisture' && (
                              <>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-600 mb-2">Potential Risks</h5>
                                  <ul className="list-disc list-inside space-y-1 text-sm">
                                    {alert.details.potentialRisks.map((risk, idx) => (
                                      <li key={idx} className="text-gray-700">{risk}</li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Recommendations Section */}
                      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                          <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                          Recommended Actions
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {alert.recommendations.map((rec, index) => (
                            <div 
                              key={index}
                              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-shrink-0">
                                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                                  {index + 1}
                                </div>
                              </div>
                              <span className="text-gray-700">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Alerts; 