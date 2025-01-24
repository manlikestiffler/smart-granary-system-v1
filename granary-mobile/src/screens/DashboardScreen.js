import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DashboardScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderSensorCard = (title, value, unit, status, icon, color, trend) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('SensorDetails', { type: title })}
      className="flex-1">
      <Animated.View
        className={`bg-white rounded-3xl p-4 shadow-sm border-l-4 ${status === 'Normal' ? 'border-success' : 'border-warning'}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}>
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-gray-600 text-base">{title}</Text>
          <Icon name={icon} size={24} color={color} />
        </View>
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-bold text-gray-800">{value}</Text>
          <Text className="text-lg text-gray-600 ml-1">{unit}</Text>
        </View>
        <View className="flex-row items-center mt-2">
          <Icon 
            name={status === 'Normal' ? 'check-circle' : 'alert'} 
            size={16} 
            color={status === 'Normal' ? '#059669' : '#D97706'} 
          />
          <Text 
            className={`text-sm ml-1 font-medium ${status === 'Normal' ? 'text-success' : 'text-warning'}`}>
            {status}
          </Text>
        </View>
        <View className="mt-2">
          {trend}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  const renderStatCard = (icon, title, value, bgColor, iconColor) => (
    <View
      className="bg-white rounded-lg p-2 w-[48%] mb-2 shadow-sm flex-row items-center"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}>
      <View className={`${bgColor} w-7 h-7 rounded-full items-center justify-center mr-2`}>
        <Icon name={icon} size={14} color={iconColor} />
      </View>
      <View>
        <Text className="text-gray-500 text-[10px]">{title}</Text>
        <Text className="text-gray-900 text-xs font-medium" numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          className="bg-white px-4 pt-4 pb-6"
          style={{
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            }],
          }}>
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text className="text-2xl font-bold text-gray-800">Storage Monitor</Text>
              <View className="h-1 w-16 bg-primary rounded-full mt-1" />
            </View>
            <TouchableOpacity 
              className="bg-primary-dark/10 p-2 rounded-full"
              onPress={() => navigation.navigate('Notifications')}
              style={{
                shadowColor: '#3B82F6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}>
              <Icon name="bell-outline" size={24} color="#1D4ED8" />
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full border-2 border-white" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center mt-2">
            <Icon name="clock-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1">Last updated: 11:32:32 AM</Text>
          </View>
        </Animated.View>

        {/* Sensor Cards Grid */}
        <View className="px-4 py-4">
          <View className="flex-row space-x-4 mb-4">
            {renderSensorCard(
              'Temperature',
              '18.7',
              '°C',
              'Normal',
              'thermometer',
              '#059669',
              <View className="h-1 bg-success/20 rounded-full">
                <View className="h-full w-3/4 bg-success rounded-full" />
              </View>
            )}
            {renderSensorCard(
              'Humidity',
              '62.2',
              '%',
              'Warning',
              'water-percent',
              '#D97706',
              <View className="h-1 bg-warning/20 rounded-full">
                <View className="h-full w-1/2 bg-warning rounded-full" />
              </View>
            )}
          </View>
          <View className="flex-row space-x-4">
            {renderSensorCard(
              'Moisture',
              '15.7',
              '%',
              'Warning',
              'water',
              '#D97706',
              <View className="h-1 bg-warning/20 rounded-full">
                <View className="h-full w-2/3 bg-warning rounded-full" />
              </View>
            )}
          </View>
        </View>

        {/* System Stats */}
        <View className="px-3 pb-4">
          <Text className="text-sm font-medium text-gray-800 mb-2 px-1">System Status</Text>
          <View className="flex-row flex-wrap justify-between">
            {renderStatCard(
              'cpu-64-bit',
              'CPU Usage',
              '42%',
              'bg-purple-50',
              '#7C3AED'
            )}
            {renderStatCard(
              'wifi',
              'Signal Strength',
              'Excellent',
              'bg-blue-50',
              '#2563EB'
            )}
            {renderStatCard(
              'chart-line',
              'Data Points',
              '24.3K',
              'bg-green-50',
              '#059669'
            )}
            {renderStatCard(
              'chip',
              'Active Sensors',
              '12/12',
              'bg-orange-50',
              '#D97706'
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}