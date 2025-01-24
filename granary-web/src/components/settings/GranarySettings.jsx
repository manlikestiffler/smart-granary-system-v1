import React from 'react';
import { Form, Input, InputNumber, Select, Card, Space, Row, Col, Switch } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';

const { Option } = Select;

function GranarySettings() {
  return (
    <Card
      title={
        <Space>
          <DatabaseOutlined />
          <span>Granary Configuration</span>
        </Space>
      }
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Form.Item
            label="Grain Type"
            name={['granary', 'grainType']}
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="wheat">Wheat</Option>
              <Option value="corn">Corn</Option>
              <Option value="rice">Rice</Option>
              <Option value="barley">Barley</Option>
              <Option value="soybean">Soybean</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Storage Capacity (tons)"
            name={['granary', 'capacity']}
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Current Fill Level (%)"
            name={['granary', 'fillLevel']}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Ventilation Control"
            name={['granary', 'ventilation', 'enabled']}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Automated Pest Control"
            name={['granary', 'pestControl', 'enabled']}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Emergency Contact"
            name={['granary', 'emergencyContact']}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}

export default GranarySettings; 