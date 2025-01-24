import React from 'react';
import { Card, Statistic, Row, Col, Progress, Tooltip, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

function AnalyticsCard({ sensorKey, analytics, sensorType }) {
  const formatValue = (value) => typeof value === 'number' ? value.toFixed(2) : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        title={
          <Space>
            {sensorType.name} Analytics
            <Tooltip title="Statistical analysis of sensor data">
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        }
        style={{ height: '100%' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Statistic
              title="Current Value"
              value={formatValue(analytics.current)}
              suffix={sensorType.unit}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Mean"
              value={formatValue(analytics.mean)}
              suffix={sensorType.unit}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Standard Deviation"
              value={formatValue(analytics.stdDev)}
              suffix={sensorType.unit}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Trend"
              value={formatValue(analytics.trend)}
              suffix={`${sensorType.unit}/hr`}
              valueStyle={{ 
                color: analytics.trend > 0 ? '#f5222d' : '#52c41a'
              }}
            />
          </Col>
          <Col span={24}>
            <div style={{ marginBottom: 8 }}>Stability Index</div>
            <Progress
              percent={Number(analytics.stability.toFixed(1))}
              status={analytics.stability > 80 ? 'success' : 'active'}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
          </Col>
          <Col span={24}>
            <div style={{ marginBottom: 8 }}>Out of Range</div>
            <Progress
              percent={Number(analytics.outOfRangePercentage.toFixed(1))}
              status={analytics.outOfRangePercentage > 20 ? 'exception' : 'normal'}
              strokeColor={{
                '0%': '#87d068',
                '100%': '#f5222d',
              }}
            />
          </Col>
        </Row>
      </Card>
    </motion.div>
  );
}

export default AnalyticsCard; 