import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';

export default function SensorDetailsScreen({ route, navigation }) {
  const { type } = route.params;
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);
  const translateYAnim = new Animated.Value(20);

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
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
      r: "4",
      stroke: "#3B82F6",
      strokeWidth: "2"
    },
    propsForBackgroundLines: {
      stroke: "#E5E7EB",
      strokeDasharray: "5,5"
    }
  };

  const chartStyle = {
    marginVertical: 8,
    borderRadius: 16,
  };

  const getSensorData = () => {
    switch (type) {
      case 'Temperature':
        return {
          value: '18.7',
          unit: '°C',
          status: 'Normal',
          icon: 'thermometer',
          color: '#059669',
          data: [18.2, 18.5, 18.7, 18.6, 18.5, 18.7],
          chartColor: 'rgba(5, 150, 105, 1)'
        };
      case 'Humidity':
        return {
          value: '62.2',
          unit: '%',
          status: 'Warning',
          icon: 'water-percent',
          color: '#D97706',
          data: [60, 61, 62, 61.5, 62, 62.2],
          chartColor: 'rgba(217, 119, 6, 1)'
        };
      case 'Moisture':
        return {
          value: '15.7',
          unit: '%',
          status: 'Warning',
          icon: 'water',
          color: '#D97706',
          data: [15.2, 15.4, 15.5, 15.6, 15.7, 15.7],
          chartColor: 'rgba(217, 119, 6, 1)'
        };
      default:
        return null;
    }
  };

  const sensorData = getSensorData();

  const renderStatCard = (title, value, delay = 0) => (
    <Animated.View
      className="flex-1 bg-white rounded-2xl p-4 shadow-sm"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}>
      <Text className="text-gray-600 text-sm mb-1">{title}</Text>
      <Text className="text-gray-800 text-lg font-semibold">{value}</Text>
    </Animated.View>
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
          <View className="flex-row items-center mb-4">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="mr-3">
              <Icon name="arrow-left" size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800">{type} Details</Text>
          </View>
          
          {/* Current Reading Card */}
          <Animated.View
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${sensorData.status === 'Normal' ? 'border-success' : 'border-warning'}`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }}>
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-gray-600 text-lg mb-2">Current Reading</Text>
                <View className="flex-row items-baseline">
                  <Text className="text-4xl font-bold text-gray-800">{sensorData.value}</Text>
                  <Text className="text-xl text-gray-600 ml-1">{sensorData.unit}</Text>
                </View>
                <View className={`flex-row items-center mt-3 ${sensorData.status === 'Normal' ? 'bg-success-bg' : 'bg-warning-bg'} px-3 py-1.5 rounded-full self-start`}>
                  <Icon 
                    name={sensorData.status === 'Normal' ? 'check-circle' : 'alert'} 
                    size={16} 
                    color={sensorData.status === 'Normal' ? '#059669' : '#D97706'} 
                  />
                  <Text className={`text-sm ml-1 font-medium ${sensorData.status === 'Normal' ? 'text-success' : 'text-warning'}`}>
                    {sensorData.status}
                  </Text>
                </View>
              </View>
              <View className={`${sensorData.status === 'Normal' ? 'bg-success-bg' : 'bg-warning-bg'} p-3 rounded-full`}>
                <Icon name={sensorData.icon} size={32} color={sensorData.color} />
              </View>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Charts Section */}
        <View className="px-4 py-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Historical Data</Text>
          
          {/* 24 Hour Chart */}
          <Animated.View
            className="bg-white rounded-2xl p-4 shadow-sm mb-6"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }],
            }}>
            <Text className="text-base font-medium text-gray-800 mb-4">Last 24 Hours</Text>
            <LineChart
              data={{
                labels: ["12:00", "14:00", "16:00", "18:00", "20:00", "Now"],
                datasets: [{
                  data: sensorData.data
                }]
              }}
              width={Dimensions.get('window').width - 48}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => sensorData.chartColor.replace('1)', `${opacity})`),
              }}
              withInnerLines={true}
              withOuterLines={true}
              withHorizontalLabels={true}
              withVerticalLabels={true}
              withDots={true}
              bezier
              style={chartStyle}
            />
          </Animated.View>

          {/* Statistics */}
          <View className="flex-row flex-wrap gap-4">
            {renderStatCard(
              'Average',
              `${(sensorData.data.reduce((a, b) => a + b, 0) / sensorData.data.length).toFixed(1)}${sensorData.unit}`
            )}
            {renderStatCard(
              'Min',
              `${Math.min(...sensorData.data).toFixed(1)}${sensorData.unit}`
            )}
            {renderStatCard(
              'Max',
              `${Math.max(...sensorData.data).toFixed(1)}${sensorData.unit}`
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 