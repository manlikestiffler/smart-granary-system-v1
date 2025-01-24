import React from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import DataLogsScreen from './src/screens/DataLogsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SensorDetailsScreen from './src/screens/SensorDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="flex-row bg-white"
      style={{
        paddingBottom: insets.bottom,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 5,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        let iconName;
        switch (route.name) {
          case 'Dashboard':
            iconName = isFocused ? 'view-dashboard' : 'view-dashboard-outline';
            break;
          case 'Data Logs':
            iconName = isFocused ? 'chart-box' : 'chart-box-outline';
            break;
          case 'Notifications':
            iconName = isFocused ? 'bell' : 'bell-outline';
            break;
          case 'Settings':
            iconName = isFocused ? 'cog' : 'cog-outline';
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity 
            key={route.key} 
            onPress={onPress}
            className="flex-1 items-center"
            style={{ paddingVertical: 12 }}>
            <View 
              className={`items-center justify-center rounded-2xl ${isFocused ? 'bg-primary/10' : ''}`}
              style={{ padding: 10 }}>
              <Icon 
                name={iconName} 
                size={24} 
                color={isFocused ? '#3B82F6' : '#6B7280'} 
              />
              <View 
                className={`h-1 w-1 rounded-full mt-1 ${isFocused ? 'bg-primary' : 'bg-transparent'}`} 
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard'
        }}
      />
      <Tab.Screen 
        name="Data Logs" 
        component={DataLogsScreen}
        options={{
          tabBarLabel: 'Data Logs'
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Alerts'
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings'
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen 
              name="SensorDetails" 
              component={SensorDetailsScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_right',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
