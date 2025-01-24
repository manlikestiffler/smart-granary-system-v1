import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  const [selectedSetting, setSelectedSetting] = useState(null);
  const [thresholds, setThresholds] = useState({
    temperature: {
      critical: 28,
      warning: 26
    },
    humidity: {
      critical: 70,
      warning: 65
    },
    moisture: {
      critical: 16,
      warning: 15
    }
  });
  const [syncInterval, setSyncInterval] = useState(5);

  // Add new state for system modals
  const [systemModal, setSystemModal] = useState({
    visible: false,
    type: null,
    title: '',
    content: ''
  });

  const renderThresholdModal = () => {
    const type = selectedSetting?.toLowerCase().split(' ')[0];
    if (!type || !thresholds[type]) return null;

    const unit = type === 'temperature' ? '°C' : '%';

    return (
      <Modal
        visible={!!selectedSetting}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedSetting(null)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold text-gray-800">{selectedSetting}</Text>
                <TouchableOpacity 
                  onPress={() => setSelectedSetting(null)}
                  className="p-2"
                >
                  <Icon name="close" size={20} color="#1F2937" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="p-4">
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Critical Threshold</Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg border border-gray-200">
                  <TextInput
                    className="flex-1 px-3 py-2 text-gray-700"
                    keyboardType="numeric"
                    value={thresholds[type].critical.toString()}
                    onChangeText={(value) => {
                      setThresholds(prev => ({
                        ...prev,
                        [type]: {
                          ...prev[type],
                          critical: parseFloat(value) || 0
                        }
                      }));
                    }}
                  />
                  <Text className="pr-3 text-gray-500">{unit}</Text>
                </View>
                <Text className="text-xs text-gray-500 mt-1">
                  System will trigger critical alerts above this value
                </Text>
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Warning Threshold</Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg border border-gray-200">
                  <TextInput
                    className="flex-1 px-3 py-2 text-gray-700"
                    keyboardType="numeric"
                    value={thresholds[type].warning.toString()}
                    onChangeText={(value) => {
                      setThresholds(prev => ({
                        ...prev,
                        [type]: {
                          ...prev[type],
                          warning: parseFloat(value) || 0
                        }
                      }));
                    }}
                  />
                  <Text className="pr-3 text-gray-500">{unit}</Text>
                </View>
                <Text className="text-xs text-gray-500 mt-1">
                  System will trigger warnings above this value
                </Text>
              </View>

              <TouchableOpacity 
                className="bg-blue-500 rounded-lg py-3 px-4"
                onPress={() => setSelectedSetting(null)}
              >
                <Text className="text-white text-center font-medium">Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderSyncModal = () => (
    <Modal
      visible={selectedSetting === 'Sync Frequency'}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedSetting(null)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl">
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-800">Sync Frequency</Text>
              <TouchableOpacity 
                onPress={() => setSelectedSetting(null)}
                className="p-2"
              >
                <Icon name="close" size={20} color="#1F2937" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="p-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Update Interval</Text>
            <View className="flex-row items-center bg-gray-50 rounded-lg border border-gray-200">
              <TextInput
                className="flex-1 px-3 py-2 text-gray-700"
                keyboardType="numeric"
                value={syncInterval.toString()}
                onChangeText={(value) => setSyncInterval(parseInt(value) || 5)}
              />
              <Text className="pr-3 text-gray-500">minutes</Text>
            </View>
            <Text className="text-xs text-gray-500 mt-1">
              Data will be refreshed every {syncInterval} minutes
            </Text>

            <TouchableOpacity 
              className="bg-blue-500 rounded-lg py-3 px-4 mt-4"
              onPress={() => setSelectedSetting(null)}
            >
              <Text className="text-white text-center font-medium">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Add system modal content
  const getSystemModalContent = (type) => {
    switch (type) {
      case 'about':
        return {
          title: 'About',
          content: (
            <View>
              <View className="flex-row items-center justify-center mb-4">
                <Icon name="grain" size={40} color="#3B82F6" />
                <Text className="text-xl font-bold text-gray-900 ml-2">Smart Granary</Text>
              </View>
              <Text className="text-sm text-gray-600 mb-2">Version 1.0.0</Text>
              <Text className="text-sm text-gray-600 mb-2">© 2024 Smart Granary Systems</Text>
              <Text className="text-sm text-gray-600">
                Smart Granary is an intelligent monitoring system designed to help maintain optimal conditions for grain storage through advanced sensor technology and automated controls.
              </Text>
            </View>
          )
        };
      case 'help':
        return {
          title: 'Help & Support',
          content: (
            <View>
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-800 mb-2">Contact Support</Text>
                <Text className="text-sm text-gray-600 mb-1">Email: support@smartgranary.com</Text>
                <Text className="text-sm text-gray-600">Phone: +1 (555) 123-4567</Text>
              </View>
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-800 mb-2">FAQs</Text>
                <TouchableOpacity className="mb-2">
                  <Text className="text-sm text-blue-500">How to configure sensor thresholds?</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2">
                  <Text className="text-sm text-blue-500">Understanding alert types</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-sm text-blue-500">Troubleshooting sensor issues</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          content: (
            <ScrollView className="max-h-96">
              <Text className="text-sm text-gray-800 font-medium mb-2">Data Collection and Usage</Text>
              <Text className="text-sm text-gray-600 mb-4">
                We collect sensor data and user information to provide and improve our grain monitoring services. This includes temperature, humidity, and moisture readings, as well as user preferences and settings.
              </Text>
              
              <Text className="text-sm text-gray-800 font-medium mb-2">Data Security</Text>
              <Text className="text-sm text-gray-600 mb-4">
                We implement industry-standard security measures to protect your data. All sensor readings and personal information are encrypted during transmission and storage.
              </Text>

              <Text className="text-sm text-gray-800 font-medium mb-2">Information Sharing</Text>
              <Text className="text-sm text-gray-600 mb-4">
                We do not share your personal information or sensor data with third parties without your explicit consent, except as required by law.
              </Text>
            </ScrollView>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          content: (
            <ScrollView className="max-h-96">
              <Text className="text-sm text-gray-800 font-medium mb-2">Service Usage</Text>
              <Text className="text-sm text-gray-600 mb-4">
                By using Smart Granary, you agree to these terms and conditions. Our service provides grain storage monitoring and alerts based on sensor data.
              </Text>

              <Text className="text-sm text-gray-800 font-medium mb-2">User Responsibilities</Text>
              <Text className="text-sm text-gray-600 mb-4">
                Users are responsible for maintaining accurate threshold settings and responding to system alerts appropriately. Regular system checks are recommended.
              </Text>

              <Text className="text-sm text-gray-800 font-medium mb-2">Liability</Text>
              <Text className="text-sm text-gray-600 mb-4">
                While we strive for accuracy, we cannot guarantee uninterrupted service or absolute accuracy of sensor readings. Users should maintain appropriate backup monitoring systems.
              </Text>
            </ScrollView>
          )
        };
      default:
        return { title: '', content: null };
    }
  };

  // Add system modal component
  const renderSystemModal = () => (
    <Modal
      visible={systemModal.visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSystemModal({ visible: false, type: null, title: '', content: '' })}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl">
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-800">{systemModal.title}</Text>
              <TouchableOpacity 
                onPress={() => setSystemModal({ visible: false, type: null, title: '', content: '' })}
                className="p-2"
              >
                <Icon name="close" size={20} color="#1F2937" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="p-4">
            {systemModal.content}
          </View>
        </View>
      </View>
    </Modal>
  );

  // Modify the renderSettingItem to fix icon spacing and handle system section clicks
  const renderSettingItem = ({ icon, title, description, onPress, value, type = 'arrow' }) => (
    <TouchableOpacity 
      onPress={() => {
        if (type === 'switch') {
          onPress();
        } else if (title.includes('Threshold')) {
          setSelectedSetting(title);
        } else if (title === 'Sync Frequency') {
          setSelectedSetting(title);
        } else if (title === 'Temperature Unit') {
          setTemperatureUnit(temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius');
        } else if (title === 'About') {
          const content = getSystemModalContent('about');
          setSystemModal({ visible: true, type: 'about', title: content.title, content: content.content });
        } else if (title === 'Help & Support') {
          const content = getSystemModalContent('help');
          setSystemModal({ visible: true, type: 'help', title: content.title, content: content.content });
        } else if (title === 'Privacy Policy') {
          const content = getSystemModalContent('privacy');
          setSystemModal({ visible: true, type: 'privacy', title: content.title, content: content.content });
        } else if (title === 'Terms of Service') {
          const content = getSystemModalContent('terms');
          setSystemModal({ visible: true, type: 'terms', title: content.title, content: content.content });
        } else {
          onPress?.();
        }
      }}
      className="flex-row items-center bg-white p-4 border-b border-gray-100"
    >
      <View className="w-8 items-center">
        <Icon name={icon} size={22} color="#4B5563" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-sm font-medium text-gray-900">{title}</Text>
        {description && (
          <Text className="text-xs text-gray-500 mt-0.5">{description}</Text>
        )}
      </View>
      {type === 'arrow' && (
        <Icon name="chevron-right" size={20} color="#9CA3AF" />
      )}
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
          thumbColor={value ? '#3B82F6' : '#F3F4F6'}
        />
      )}
      {type === 'value' && (
        <Text className="text-sm text-gray-600">{value}</Text>
      )}
    </TouchableOpacity>
  );

  const renderSectionHeader = (title) => (
    <View className="px-4 py-2 bg-gray-50">
      <Text className="text-xs font-medium text-gray-500 uppercase">{title}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Profile Section */}
        <View className="bg-white p-4 flex-row items-center border-b border-gray-100">
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center">
            <Icon name="account" size={24} color="#3B82F6" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-medium text-gray-900">John Doe</Text>
            <Text className="text-sm text-gray-500">john.doe@example.com</Text>
          </View>
          <TouchableOpacity>
            <Icon name="pencil" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* System Configuration */}
        {renderSectionHeader('System Configuration')}
        {renderSettingItem({
          icon: 'thermometer',
          title: 'Temperature Thresholds',
          description: 'Set critical and warning temperature levels',
          onPress: () => {}
        })}
        {renderSettingItem({
          icon: 'water-percent',
          title: 'Humidity Thresholds',
          description: 'Configure humidity warning levels',
          onPress: () => {}
        })}
        {renderSettingItem({
          icon: 'water',
          title: 'Moisture Thresholds',
          description: 'Set grain moisture content limits',
          onPress: () => {}
        })}

        {/* Notification Settings */}
        {renderSectionHeader('Notifications')}
        {renderSettingItem({
          icon: 'bell-outline',
          title: 'Push Notifications',
          description: 'Receive alerts on your device',
          type: 'switch',
          value: notificationsEnabled,
          onPress: () => setNotificationsEnabled(!notificationsEnabled)
        })}
        {renderSettingItem({
          icon: 'email-outline',
          title: 'Email Notifications',
          description: 'Get alerts via email',
          type: 'switch',
          value: emailNotifications,
          onPress: () => setEmailNotifications(!emailNotifications)
        })}
        {renderSettingItem({
          icon: 'message-text-outline',
          title: 'SMS Notifications',
          description: 'Receive SMS alerts',
          type: 'switch',
          value: smsNotifications,
          onPress: () => setSmsNotifications(!smsNotifications)
        })}

        {/* Device Settings */}
        {renderSectionHeader('Device Settings')}
        {renderSettingItem({
          icon: 'theme-light-dark',
          title: 'Dark Mode',
          description: 'Toggle dark theme',
          type: 'switch',
          value: darkMode,
          onPress: () => setDarkMode(!darkMode)
        })}
        {renderSettingItem({
          icon: 'temperature-celsius',
          title: 'Temperature Unit',
          description: 'Choose your preferred unit',
          type: 'value',
          value: temperatureUnit === 'celsius' ? '°C' : '°F',
          onPress: () => setTemperatureUnit(temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius')
        })}
        {renderSettingItem({
          icon: 'refresh',
          title: 'Sync Frequency',
          description: 'Set data refresh interval',
          type: 'value',
          value: '5 min',
          onPress: () => {}
        })}

        {/* System Info & Help */}
        {renderSectionHeader('System')}
        {renderSettingItem({
          icon: 'information',
          title: 'About',
          description: 'App version and information',
          onPress: () => {}
        })}
        {renderSettingItem({
          icon: 'help-circle',
          title: 'Help & Support',
          description: 'Get assistance and contact support',
          onPress: () => {}
        })}
        {renderSettingItem({
          icon: 'shield-check',
          title: 'Privacy Policy',
          onPress: () => {}
        })}
        {renderSettingItem({
          icon: 'file-document',
          title: 'Terms of Service',
          onPress: () => {}
        })}
        
        {/* Danger Zone */}
        {renderSectionHeader('Account')}
        <TouchableOpacity 
          className="flex-row items-center bg-white p-4 border-b border-gray-100"
          onPress={() => {}}
        >
          <Icon name="logout" size={22} color="#EF4444" />
          <View className="flex-1 ml-3">
            <Text className="text-sm font-medium text-red-500">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {renderThresholdModal()}
      {renderSyncModal()}
      {renderSystemModal()}
    </SafeAreaView>
  );
} 