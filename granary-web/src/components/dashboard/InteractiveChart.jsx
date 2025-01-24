import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Brush
} from 'recharts';
import { Card, Space, Button } from 'antd';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

function InteractiveChart({
  data,
  config,
  chartState,
  onZoom,
  onBrush,
  onReset,
  sensorTypes
}) {
  return (
    <Card
      title="Sensor Data Trends"
      extra={
        <Space>
          <Button 
            icon={<ZoomInOutlined />}
            onClick={() => onZoom('in')}
          />
          <Button 
            icon={<ZoomOutOutlined />}
            onClick={() => onZoom('out')}
          />
          <Button onClick={onReset}>Reset</Button>
        </Space>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          onMouseDown={chartState.handleMouseDown}
          onMouseMove={chartState.handleMouseMove}
          onMouseUp={chartState.handleMouseUp}
          {...config.baseConfig}
        >
          <CartesianGrid {...config.gridConfig} />
          <XAxis {...config.axisConfig} />
          <YAxis {...config.axisConfig} />
          <Tooltip {...config.tooltipConfig} />
          <Legend />
          <Brush
            dataKey="timestamp"
            height={30}
            stroke="#8884d8"
            onChange={onBrush}
          />
          {Object.entries(sensorTypes).map(([key, sensor]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={sensor.name}
              stroke={sensor.color}
              dot={false}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default InteractiveChart; 