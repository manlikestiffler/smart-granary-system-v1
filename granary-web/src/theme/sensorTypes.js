import {
  TemperatureIcon,
  MoistureIcon,
  GrainIcon,
  PestIcon
} from '../components/icons/SensorIcons.jsx';

export const sensorTypes = {
  temperature: {
    name: 'Temperature',
    unit: '°C',
    icon: TemperatureIcon,
    color: '#dc2626',
    ranges: {
      min: 15,
      max: 30,
      optimal: 22
    },
    description: 'Monitors ambient temperature in the granary'
  },
  humidity: {
    name: 'Humidity',
    unit: '%',
    icon: MoistureIcon,
    color: '#22c55e',
    ranges: {
      min: 30,
      max: 70,
      optimal: 45
    },
    description: 'Tracks relative humidity levels'
  },
  moisture: {
    name: 'Grain Moisture',
    unit: '%',
    icon: GrainIcon,
    color: '#eab308',
    ranges: {
      min: 12,
      max: 18,
      optimal: 14
    },
    description: 'Measures moisture content in stored grain'
  },
  pestActivity: {
    name: 'Pest Activity',
    unit: 'events/hr',
    icon: PestIcon,
    color: '#f97316',
    ranges: {
      min: 0,
      max: 10,
      critical: 5
    },
    description: 'Detects and monitors pest presence'
  },
  co2: {
    name: 'CO2 Level',
    unit: 'ppm',
    icon: 'CloudOutlined',
    color: '#059669',
    ranges: {
      min: 350,
      max: 1000,
      optimal: 400
    },
    description: 'Monitors carbon dioxide concentration'
  },
  airflow: {
    name: 'Air Flow',
    unit: 'm³/h',
    icon: 'SwapOutlined',
    color: '#2563eb',
    ranges: {
      min: 100,
      max: 500,
      optimal: 300
    },
    description: 'Measures ventilation rate'
  }
}; 