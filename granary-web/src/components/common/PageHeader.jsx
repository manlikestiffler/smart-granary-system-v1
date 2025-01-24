import React from 'react';
import { Typography, Space, Breadcrumb } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const { Title } = Typography;

function PageHeader({ title, subtitle, breadcrumbs }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 24 }}
    >
      {breadcrumbs && (
        <Breadcrumb style={{ marginBottom: 8 }}>
          {breadcrumbs.map((item, index) => (
            <Breadcrumb.Item key={index}>
              {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
      <Space direction="vertical" size={4}>
        <Title level={2} style={{ margin: 0 }}>{title}</Title>
        {subtitle && (
          <Typography.Text type="secondary">
            {subtitle}
          </Typography.Text>
        )}
      </Space>
    </motion.div>
  );
}

export default PageHeader; 