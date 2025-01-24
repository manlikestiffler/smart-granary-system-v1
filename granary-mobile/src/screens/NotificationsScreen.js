import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock notifications data with additional details
const mockNotifications = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  type: i % 4 === 0 ? 'critical' : i % 3 === 0 ? 'warning' : i % 2 === 0 ? 'info' : 'normal',
  message: [
    'Temperature exceeded critical threshold',
    'Humidity levels rising rapidly',
    'Grain moisture content critically high',
    'System maintenance required',
    'New sensor readings available',
  ][i % 5],
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  location: `Zone ${String.fromCharCode(65 + (i % 3))} - Silo ${1 + (i % 2)}`,
  isRead: i > 5,
  // Additional details for modal
  alertInfo: {
    status: 'Active',
    currentValue: i % 4 === 0 ? '29.2°C' : i % 3 === 0 ? '75%' : '18%',
    threshold: i % 4 === 0 ? '28°C' : i % 3 === 0 ? '70%' : '15%',
    duration: '15 minutes'
  },
  systemDetails: {
    equipment: 'Cooling system',
    status: 'active',
    lastMaintenance: '2024-03-15',
    range: i % 4 === 0 ? '26.5°C - 29.2°C' : i % 3 === 0 ? '65% - 75%' : '12% - 18%'
  },
  impact: {
    potential: [
      'Grain quality degradation',
      'Increased moisture migration',
      'Pest activity risk'
    ],
    response: [
      'Automated fan activation',
      'Increased airflow',
      'Temperature logging frequency increased'
    ]
  },
  recommendedActions: [
    'Check ventilation system',
    'Verify cooling system operation',
    'Inspect for heat sources',
    'Adjust cooling parameters',
    'Monitor adjacent zones'
  ]
}));

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Filter notifications based on type and search term
  const filteredNotifications = notifications.filter(notification => {
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesSearch = 
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'alert-circle';
      case 'warning':
        return 'alert';
      case 'info':
        return 'information';
      default:
        return 'check-circle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'critical':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      case 'info':
        return '#3B82F6';
      default:
        return '#10B981';
    }
  };

  const renderDetailSection = (title, children) => (
    <View className="bg-white rounded-lg p-4 mb-3">
      <Text className="text-lg font-semibold text-gray-800 mb-3">{title}</Text>
      {children}
    </View>
  );

  const renderDetailsModal = () => (
    <Modal
      visible={!!selectedNotification}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedNotification(null)}
    >
      <View className="flex-1 bg-black/50">
        <View className="flex-1 mt-16 bg-gray-50 rounded-t-3xl">
          {/* Modal Header */}
          <View className="p-4 border-b border-gray-200 bg-white rounded-t-3xl">
            <View className="flex-row justify-between items-center">
            <View>
                <Text className="text-lg font-bold text-gray-800">Alert Details</Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                {selectedNotification?.location}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => setSelectedNotification(null)}
              className="p-2"
            >
                <Icon name="close" size={20} color="#1F2937" />
            </TouchableOpacity>
            </View>
          </View>

          {selectedNotification && (
            <ScrollView className="flex-1 px-3 py-2">
              {/* Alert Information */}
              <View className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                <Text className="text-sm font-semibold text-gray-800 mb-2">Alert Information</Text>
                <View className="space-y-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-600">Status</Text>
                    <View className="bg-red-100 px-2 py-0.5 rounded-full">
                      <Text className="text-xs text-red-700 font-medium">
                        {selectedNotification.alertInfo.status}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-600">Current Value</Text>
                    <Text className="text-xs font-medium text-gray-900">
                      {selectedNotification.alertInfo.currentValue}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-600">Threshold</Text>
                    <Text className="text-xs font-medium text-gray-900">
                      {selectedNotification.alertInfo.threshold}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-600">Duration</Text>
                    <Text className="text-xs font-medium text-gray-900">
                      {selectedNotification.alertInfo.duration}
                    </Text>
                  </View>
                </View>
              </View>

              {/* System Details */}
              <View className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                <Text className="text-sm font-semibold text-gray-800 mb-2">System Details</Text>
                <View className="space-y-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-600">Equipment</Text>
                    <Text className="text-xs font-medium text-gray-900">
                      {selectedNotification.systemDetails.equipment}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-600">Status</Text>
                    <Text className="text-xs font-medium text-gray-900">
                      {selectedNotification.systemDetails.status}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-600">Last Maintenance</Text>
                    <Text className="text-xs font-medium text-gray-900">
                      {selectedNotification.systemDetails.lastMaintenance}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-600">Range</Text>
                    <Text className="text-xs font-medium text-gray-900">
                      {selectedNotification.systemDetails.range}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Impact & Response */}
              <View className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                <Text className="text-sm font-semibold text-gray-800 mb-2">Impact & Response</Text>
                <View>
                  <Text className="text-xs font-medium text-gray-800 mb-1">Potential Impact</Text>
                  {selectedNotification.impact.potential.map((impact, index) => (
                    <View key={index} className="flex-row items-center mb-1">
                      <View className="w-1 h-1 rounded-full bg-gray-400 mr-1.5" />
                      <Text className="text-xs text-gray-600">{impact}</Text>
                    </View>
                  ))}
                  
                  <Text className="text-xs font-medium text-gray-800 mt-3 mb-1">System Response</Text>
                  {selectedNotification.impact.response.map((response, index) => (
                    <View key={index} className="flex-row items-center mb-1">
                      <View className="w-1 h-1 rounded-full bg-gray-400 mr-1.5" />
                      <Text className="text-xs text-gray-600">{response}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Recommended Actions */}
              <View className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                <Text className="text-sm font-semibold text-gray-800 mb-2">Recommended Actions</Text>
                <View>
                  {selectedNotification.recommendedActions.map((action, index) => (
                    <View key={index} className="flex-row items-center mb-2">
                      <View className="w-5 h-5 rounded-full bg-blue-100 mr-2 items-center justify-center">
                        <Text className="text-xs text-blue-600 font-medium">{index + 1}</Text>
                      </View>
                      <Text className="text-xs text-gray-700 flex-1">{action}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  const renderNotification = (notification) => (
    <TouchableOpacity
      key={notification.id}
      onPress={() => {
        markAsRead(notification.id);
        setSelectedNotification(notification);
      }}
      className={`bg-white rounded-lg p-3 mb-2 border-l-4 shadow-sm ${
        notification.type === 'critical' ? 'border-red-500' :
        notification.type === 'warning' ? 'border-yellow-500' :
        notification.type === 'info' ? 'border-blue-500' :
        'border-green-500'
      } ${!notification.isRead ? 'bg-blue-50' : ''}`}
    >
      <View className="flex-row items-start">
        <Icon 
          name={getTypeIcon(notification.type)} 
          size={20} 
          color={getTypeColor(notification.type)}
        />
        <View className="flex-1 ml-2">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-900">
                {notification.message}
              </Text>
              <View className="flex-row items-center mt-1">
                <Icon name="map-marker" size={12} color="#6B7280" />
                <Text className="text-xs text-gray-500 ml-1">
                  {notification.location}
                </Text>
                <Text className="text-xs text-gray-400 ml-2">
                  {new Date(notification.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
            {!notification.isRead && (
              <View className="bg-blue-100 rounded-full h-2 w-2 mt-1.5 ml-2" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="px-4 pt-4 pb-2 bg-white border-b border-gray-100">
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text className="text-xl font-bold text-gray-800">System Alerts</Text>
              <Text className="text-xs text-gray-500">Monitor and manage system alerts</Text>
            </View>
            <TouchableOpacity 
              className="bg-gray-50 px-3 py-1.5 rounded-lg flex-row items-center"
              onPress={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
            >
              <Icon name="check-all" size={14} color="#4B5563" />
              <Text className="text-gray-600 text-xs ml-1.5 font-medium">Mark all as read</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View className="flex-row justify-between mt-2 mb-3">
            <View className="bg-white rounded-lg py-2 px-3 flex-1 mr-2 border border-gray-100 shadow-sm">
              <View className="flex-row items-center">
                <Icon name="chart-bar" size={16} color="#6B7280" />
                <Text className="text-xs text-gray-600 ml-1.5">Total Alerts</Text>
              </View>
              <Text className="text-lg font-bold text-gray-900 mt-0.5">
                {notifications.length}
              </Text>
            </View>
            <View className="bg-white rounded-lg py-2 px-3 flex-1 mx-1 border border-gray-100 shadow-sm">
              <View className="flex-row items-center">
                <Icon name="alert-circle" size={16} color="#EF4444" />
                <Text className="text-xs text-gray-600 ml-1.5">Critical</Text>
              </View>
              <Text className="text-lg font-bold text-gray-900 mt-0.5">
                {notifications.filter(n => n.type === 'critical').length}
              </Text>
            </View>
            <View className="bg-white rounded-lg py-2 px-3 flex-1 ml-2 border border-gray-100 shadow-sm">
              <View className="flex-row items-center">
                <Icon name="alert" size={16} color="#F59E0B" />
                <Text className="text-xs text-gray-600 ml-1.5">Warnings</Text>
              </View>
              <Text className="text-lg font-bold text-gray-900 mt-0.5">
                {notifications.filter(n => n.type === 'warning').length}
              </Text>
            </View>
          </View>

          {/* Search Bar */}
          <View className="relative mb-3">
            <Icon 
              name="magnify" 
              size={18} 
              color="#9CA3AF" 
              style={{ position: 'absolute', left: 10, top: 9 }} 
            />
            <TextInput
              className="w-full bg-gray-50 pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm"
              placeholder="Search alerts..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Filter Pills */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="flex-row mb-2"
          >
            <TouchableOpacity 
              onPress={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg mr-2 ${
                selectedType === 'all' ? 'bg-blue-500' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <Text className={`text-xs font-medium ${
                selectedType === 'all' ? 'text-white' : 'text-gray-600'
              }`}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setSelectedType('critical')}
              className={`px-3 py-1.5 rounded-lg mr-2 ${
                selectedType === 'critical' ? 'bg-red-500' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <Text className={`text-xs font-medium ${
                selectedType === 'critical' ? 'text-white' : 'text-gray-600'
              }`}>
                Critical
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setSelectedType('warning')}
              className={`px-3 py-1.5 rounded-lg mr-2 ${
                selectedType === 'warning' ? 'bg-yellow-500' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <Text className={`text-xs font-medium ${
                selectedType === 'warning' ? 'text-white' : 'text-gray-600'
              }`}>
                Warning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setSelectedType('info')}
              className={`px-3 py-1.5 rounded-lg ${
                selectedType === 'info' ? 'bg-blue-500' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <Text className={`text-xs font-medium ${
                selectedType === 'info' ? 'text-white' : 'text-gray-600'
              }`}>
                Info
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Alerts List */}
        <View className="p-3">
          {filteredNotifications.map(notification => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => {
                markAsRead(notification.id);
                setSelectedNotification(notification);
              }}
              className={`bg-white rounded-lg p-3 mb-2 border-l-4 shadow-sm ${
                notification.type === 'critical' ? 'border-red-500' :
                notification.type === 'warning' ? 'border-yellow-500' :
                notification.type === 'info' ? 'border-blue-500' :
                'border-green-500'
              } ${!notification.isRead ? 'bg-blue-50' : ''}`}
            >
              <View className="flex-row items-start">
                <Icon 
                  name={getTypeIcon(notification.type)} 
                  size={20} 
                  color={getTypeColor(notification.type)}
                />
                <View className="flex-1 ml-2">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Icon name="map-marker" size={12} color="#6B7280" />
                        <Text className="text-xs text-gray-500 ml-1">
                          {notification.location}
                        </Text>
                        <Text className="text-xs text-gray-400 ml-2">
                          {new Date(notification.timestamp).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    {!notification.isRead && (
                      <View className="bg-blue-100 rounded-full h-2 w-2 mt-1.5 ml-2" />
                    )}
                  </View>
          </View>
        </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Details Modal */}
      {renderDetailsModal()}
    </SafeAreaView>
  );
} 