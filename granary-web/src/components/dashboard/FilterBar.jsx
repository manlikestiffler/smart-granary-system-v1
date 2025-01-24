import React from 'react';
import { Space, Input, DatePicker, Select, Button } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

function FilterBar({ filters, onUpdateFilters, sensorTypes, zones }) {
  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Input
        placeholder="Search..."
        prefix={<SearchOutlined />}
        value={filters.search}
        onChange={e => onUpdateFilters({ search: e.target.value })}
        style={{ width: 200 }}
      />
      <RangePicker
        showTime
        value={filters.timeRange}
        onChange={dates => onUpdateFilters({ timeRange: dates })}
      />
      <Select
        mode="multiple"
        placeholder="Select sensors"
        value={filters.sensorTypes}
        onChange={types => onUpdateFilters({ sensorTypes: types })}
        style={{ minWidth: 200 }}
      >
        {Object.entries(sensorTypes).map(([key, sensor]) => (
          <Option key={key} value={key}>{sensor.name}</Option>
        ))}
      </Select>
      <Select
        value={filters.thresholds}
        onChange={value => onUpdateFilters({ thresholds: value })}
        style={{ width: 120 }}
      >
        <Option value="all">All Values</Option>
        <Option value="normal">Normal</Option>
        <Option value="warning">Warnings</Option>
        <Option value="error">Errors</Option>
      </Select>
      <Select
        mode="multiple"
        placeholder="Select zones"
        value={filters.zones}
        onChange={zones => onUpdateFilters({ zones })}
        style={{ minWidth: 150 }}
      >
        {zones.map(zone => (
          <Option key={zone} value={zone}>{zone}</Option>
        ))}
      </Select>
      <Button 
        icon={<ClearOutlined />}
        onClick={() => onUpdateFilters({
          search: '',
          timeRange: null,
          sensorTypes: [],
          thresholds: 'all',
          zones: []
        })}
      >
        Clear Filters
      </Button>
    </Space>
  );
}

export default FilterBar; 