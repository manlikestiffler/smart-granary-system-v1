import React from 'react';
import { Card, Statistic, Progress } from 'antd';
import { motion } from 'framer-motion';
import { theme } from '../../theme/colors';

function StatsCard({ 
  title, 
  value, 
  suffix, 
  icon: Icon, 
  color, 
  progress, 
  description 
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`,
          border: `1px solid ${color}20`,
          borderRadius: 16,
        }}
        bodyStyle={{ padding: 24 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <div
            style={{
              background: `${color}20`,
              borderRadius: 12,
              padding: 8,
              marginRight: 12,
            }}
          >
            <Icon style={{ fontSize: 24, color: color }} />
          </div>
          <span style={{ color: theme.colors.grey[700], fontWeight: 500 }}>
            {title}
          </span>
        </div>

        <Statistic
          value={value}
          suffix={suffix}
          valueStyle={{
            color: color,
            fontSize: 36,
            fontWeight: 600,
          }}
        />

        {progress && (
          <Progress
            percent={progress}
            strokeColor={color}
            showInfo={false}
            size="small"
            style={{ marginTop: 16 }}
          />
        )}

        {description && (
          <div style={{ 
            marginTop: 8, 
            color: theme.colors.grey[600], 
            fontSize: 14 
          }}>
            {description}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default StatsCard; 