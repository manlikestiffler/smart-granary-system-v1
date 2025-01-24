import React from 'react';
import { Card, Statistic, Progress, Tooltip, Space, Badge } from 'antd';
import { InfoCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { theme } from '../../theme/colors';

function EnhancedStatsCard({ 
  title, 
  value, 
  unit, 
  icon: Icon,
  color,
  thresholds,
  description,
  onClick,
  trend,
  lastUpdate,
  status = 'normal' // 'normal', 'warning', 'error'
}) {
  const getStatusColor = () => {
    if (value > thresholds.max) return theme.colors.error.main;
    if (value < thresholds.min) return theme.colors.warning.main;
    return theme.colors.success.main;
  };

  const getTrendIcon = () => {
    if (trend > 0) return <ArrowUpOutlined style={{ color: theme.colors.error.main }} />;
    if (trend < 0) return <ArrowDownOutlined style={{ color: theme.colors.success.main }} />;
    return null;
  };

  const getStatusBadge = () => {
    const statusColors = {
      normal: theme.colors.success.main,
      warning: theme.colors.warning.main,
      error: theme.colors.error.main
    };

    return (
      <Badge 
        status={status} 
        color={statusColors[status]}
        text={status.charAt(0).toUpperCase() + status.slice(1)}
      />
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <Tooltip title={description}>
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
              <Space>
                {getStatusBadge()}
                <Tooltip title="View details">
                  <InfoCircleOutlined style={{ color: theme.colors.grey[400] }} />
                </Tooltip>
              </Space>
            </Space>

            <Statistic
              value={value}
              suffix={unit}
              precision={1}
              prefix={getTrendIcon()}
              valueStyle={{
                color: getStatusColor(),
                fontSize: 36,
                fontWeight: 600,
              }}
            />

            <Progress
              percent={((value - thresholds.min) / (thresholds.max - thresholds.min)) * 100}
              strokeColor={getStatusColor()}
              showInfo={false}
              size="small"
              status={status === 'error' ? 'exception' : 'normal'}
            />

            <Space style={{ justifyContent: 'space-between', width: '100%' }}>
              <span style={{ color: theme.colors.grey[500], fontSize: 12 }}>
                Range: {thresholds.min} - {thresholds.max} {unit}
              </span>
              <span style={{ color: theme.colors.grey[500], fontSize: 12 }}>
                Last update: {lastUpdate}
              </span>
            </Space>
          </Space>
        </Card>
      </Tooltip>
    </motion.div>
  );
}

export default EnhancedStatsCard; 