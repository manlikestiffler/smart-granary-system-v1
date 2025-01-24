import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data
const mockLogs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  temperature: 24 + Math.sin(i * 0.5) * 6,
  humidity: 55 + Math.cos(i * 0.5) * 15,
  moisture: 14 + Math.sin(i * 0.3) * 3,
  location: `Zone ${String.fromCharCode(65 + (i % 3))}`,
  status: i % 5 === 0 ? 'critical' : i % 3 === 0 ? 'warning' : 'normal'
})).map(log => ({
  ...log,
  temperatureStatus: log.temperature > 28 ? 'critical' : log.temperature > 26 ? 'warning' : 'normal',
  humidityStatus: log.humidity > 65 ? 'critical' : log.humidity > 60 ? 'warning' : 'normal',
  moistureStatus: log.moisture > 16 ? 'critical' : log.moisture > 15 ? 'warning' : 'normal'
}));

export default function DataLogsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);

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

  const renderLogRow = (log) => (
    <TouchableOpacity
      key={log.id}
      onPress={() => setSelectedLog(log)}
      className={`bg-white rounded-lg shadow-sm p-4 mb-2 border-l-4 ${
        log.status === 'critical' ? 'border-red-500' :
        log.status === 'warning' ? 'border-yellow-500' :
        'border-green-500'
      }`}>
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-sm text-gray-500">
            {new Date(log.timestamp).toLocaleString()}
          </Text>
          <View className="flex-row items-center mt-1">
            <Icon name="map-marker" size={14} color="#6B7280" />
            <Text className="text-sm font-medium text-gray-700 ml-1">
              {log.location}
            </Text>
          </View>
        </View>
        <View className={`px-3 py-1 rounded-full ${
          log.status === 'critical' ? 'bg-red-100' :
          log.status === 'warning' ? 'bg-yellow-100' :
          'bg-green-100'
        }`}>
          <Text className={`text-xs font-medium capitalize ${
            log.status === 'critical' ? 'text-red-700' :
            log.status === 'warning' ? 'text-yellow-700' :
            'text-green-700'
          }`}>
            {log.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDetailsModal = () => (
    <Modal
      visible={!!selectedLog}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedLog(null)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl">
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-bold text-gray-800">Sensor Readings</Text>
              <TouchableOpacity 
                onPress={() => setSelectedLog(null)}
                className="p-2"
              >
                <Icon name="close" size={24} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500 mt-1">
              {selectedLog && new Date(selectedLog.timestamp).toLocaleString()}
            </Text>
      </View>

          {selectedLog && (
            <ScrollView className="p-4" style={{ maxHeight: 400 }}>
              {/* Temperature Reading */}
              <View className="bg-white rounded-xl shadow-sm p-4 mb-3">
                <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Icon 
            name="thermometer" 
                      size={24} 
            color={
                        selectedLog.temperatureStatus === 'critical' ? '#ef4444' :
                        selectedLog.temperatureStatus === 'warning' ? '#f59e0b' :
              '#22c55e'
            } 
          />
                    <Text className="text-lg font-medium text-gray-800 ml-2">Temperature</Text>
                  </View>
                  <Text className="text-2xl font-bold text-gray-900">
                    {selectedLog.temperature.toFixed(1)}°C
                  </Text>
                </View>
                <View className={`mt-2 px-3 py-1 rounded-full self-start ${
                  selectedLog.temperatureStatus === 'critical' ? 'bg-red-100' :
                  selectedLog.temperatureStatus === 'warning' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  <Text className={`text-sm font-medium capitalize ${
                    selectedLog.temperatureStatus === 'critical' ? 'text-red-700' :
                    selectedLog.temperatureStatus === 'warning' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                    {selectedLog.temperatureStatus}
                  </Text>
          </View>
        </View>

              {/* Humidity Reading */}
              <View className="bg-white rounded-xl shadow-sm p-4 mb-3">
                <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Icon 
            name="water-percent" 
                      size={24} 
            color={
                        selectedLog.humidityStatus === 'critical' ? '#ef4444' :
                        selectedLog.humidityStatus === 'warning' ? '#f59e0b' :
              '#22c55e'
            } 
          />
                    <Text className="text-lg font-medium text-gray-800 ml-2">Humidity</Text>
                  </View>
                  <Text className="text-2xl font-bold text-gray-900">
                    {selectedLog.humidity.toFixed(1)}%
                  </Text>
                </View>
                <View className={`mt-2 px-3 py-1 rounded-full self-start ${
                  selectedLog.humidityStatus === 'critical' ? 'bg-red-100' :
                  selectedLog.humidityStatus === 'warning' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  <Text className={`text-sm font-medium capitalize ${
                    selectedLog.humidityStatus === 'critical' ? 'text-red-700' :
                    selectedLog.humidityStatus === 'warning' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                    {selectedLog.humidityStatus}
                  </Text>
          </View>
        </View>

              {/* Moisture Reading */}
              <View className="bg-white rounded-xl shadow-sm p-4 mb-3">
                <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Icon 
            name="water" 
                      size={24} 
            color={
                        selectedLog.moistureStatus === 'critical' ? '#ef4444' :
                        selectedLog.moistureStatus === 'warning' ? '#f59e0b' :
              '#22c55e'
            } 
          />
                    <Text className="text-lg font-medium text-gray-800 ml-2">Moisture</Text>
                  </View>
                  <Text className="text-2xl font-bold text-gray-900">
                    {selectedLog.moisture.toFixed(1)}%
                  </Text>
                </View>
                <View className={`mt-2 px-3 py-1 rounded-full self-start ${
                  selectedLog.moistureStatus === 'critical' ? 'bg-red-100' :
                  selectedLog.moistureStatus === 'warning' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  <Text className={`text-sm font-medium capitalize ${
                    selectedLog.moistureStatus === 'critical' ? 'text-red-700' :
                    selectedLog.moistureStatus === 'warning' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                    {selectedLog.moistureStatus}
                  </Text>
          </View>
        </View>
            </ScrollView>
          )}
      </View>
    </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="p-4 bg-white">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-gray-800">Sensor Logs</Text>
            <TouchableOpacity 
              className="bg-blue-500 px-4 py-2 rounded-lg flex-row items-center"
              onPress={() => {/* Handle export */}}>
              <Icon name="download" size={16} color="#fff" />
              <Text className="text-white ml-2 font-medium">Export</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="relative mb-4">
            <Icon 
              name="magnify" 
              size={20} 
              color="#9CA3AF" 
              style={{ position: 'absolute', left: 12, top: 10 }} 
            />
            <TextInput
              className="w-full bg-gray-50 pl-10 pr-4 py-2 rounded-lg border border-gray-200"
              placeholder="Search logs..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Filters */}
          <View className="flex-row space-x-2">
            <TouchableOpacity 
              onPress={() => setSelectedStatus('all')}
              className={`px-3 py-1 rounded-lg ${selectedStatus === 'all' ? 'bg-blue-500' : 'bg-gray-100'}`}>
              <Text className={selectedStatus === 'all' ? 'text-white' : 'text-gray-600'}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setSelectedStatus('normal')}
              className={`px-3 py-1 rounded-lg ${selectedStatus === 'normal' ? 'bg-green-500' : 'bg-gray-100'}`}>
              <Text className={selectedStatus === 'normal' ? 'text-white' : 'text-gray-600'}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setSelectedStatus('warning')}
              className={`px-3 py-1 rounded-lg ${selectedStatus === 'warning' ? 'bg-yellow-500' : 'bg-gray-100'}`}>
              <Text className={selectedStatus === 'warning' ? 'text-white' : 'text-gray-600'}>Warning</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setSelectedStatus('critical')}
              className={`px-3 py-1 rounded-lg ${selectedStatus === 'critical' ? 'bg-red-500' : 'bg-gray-100'}`}>
              <Text className={selectedStatus === 'critical' ? 'text-white' : 'text-gray-600'}>Critical</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logs List */}
        <View className="p-4">
          {filteredLogs.map(renderLogRow)}
        </View>
      </ScrollView>

      {/* Details Modal */}
      {renderDetailsModal()}
    </SafeAreaView>
  );
} 