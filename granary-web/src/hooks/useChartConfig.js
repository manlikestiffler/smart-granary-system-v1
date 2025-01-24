import { useMemo } from 'react';
import { theme } from '../theme/colors';

export function useChartConfig(data, sensorTypes) {
  return useMemo(() => {
    const baseConfig = {
      width: '100%',
      height: 400,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
      syncId: 'sensorSync',
    };

    const tooltipConfig = {
      contentStyle: {
        backgroundColor: theme.colors.grey[800],
        border: 'none',
        borderRadius: '8px',
        padding: '12px',
      },
      labelStyle: { color: 'white' },
      itemStyle: { color: 'white' },
      formatter: (value, name) => [
        `${value.toFixed(1)} ${sensorTypes[name].unit}`,
        sensorTypes[name].name
      ],
    };

    const axisConfig = {
      stroke: theme.colors.grey[400],
      style: {
        fontSize: '12px',
      },
    };

    const gridConfig = {
      strokeDasharray: '3 3',
      stroke: theme.colors.grey[200],
    };

    return {
      baseConfig,
      tooltipConfig,
      axisConfig,
      gridConfig,
    };
  }, []);
}