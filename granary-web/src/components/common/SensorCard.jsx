import React from 'react';
import { Card, Statistic, Progress, Tooltip, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { theme } from '../../theme/colors';
import { useRealtimeData } from '../../hooks/useRealtimeData';

function SensorCard({ 
  title, 
  value, 
  unit, 
  icon: Icon,
  color,
  thresholds,
  description,
  onClick,
  trend 
}) {
  const getStatusColor = () => {
    if (value > thresholds.max) return theme.colors.error.main;
    if (value < thresholds.min) return theme.colors.warning.main;
    return theme.colors.success.main;
  };

  const getTrendIcon = () => {
    if (trend > 0) return '↗';
    if (trend < 0) return '↘';
    return '→';
  };

  const getTrendColor = () => {
    if (trend > 0) return theme.colors.error.main;
    if (trend < 0) return theme.colors.success.main;
    return theme.colors.grey[500];
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <Card
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`,
          borderRadius: 16,
          cursor: onClick ? 'pointer' : 'default',
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space>
              <Icon style={{ fontSize: 24, color }} />
              <span style={{ fontWeight: 500 }}>{title}</span>
            </Space>
            <Tooltip title="View details">
              <InfoCircleOutlined style={{ color: theme.colors.grey[400] }} />
            </Tooltip>
          </Space>

          <Statistic
            value={value}
            suffix={unit}
            precision={1}
            valueStyle={{
              color: getStatusColor(),
              fontSize: 36,
              fontWeight: 600,
            }}
          />

          <Space align="center">
            <span style={{ color: getTrendColor(), fontSize: 20 }}>
              {getTrendIcon()}
            </span>
            <span style={{ color: theme.colors.grey[500], fontSize: 14 }}>
              {Math.abs(trend).toFixed(1)}{unit} in last hour
            </span>
          </Space>

          <Progress
            percent={((value - thresholds.min) / (thresholds.max - thresholds.min)) * 100}
            strokeColor={getStatusColor()}
            showInfo={false}
            size="small"
          />

          <div style={{ color: theme.colors.grey[500], fontSize: 14 }}>
            {description}
          </div>
        </Space>
      </Card>
    </motion.div>
  );
}

export default SensorCard; 