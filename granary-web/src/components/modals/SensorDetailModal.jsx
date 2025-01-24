import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

function SensorDetailModal({ visible, onClose, sensorData, historicalData }) {
  if (!sensorData) return null;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600 mb-1">{formatDate(label)}</p>
          <p className="font-medium text-gray-900">
            {payload[0].value.toFixed(1)} {sensorData.unit}
          </p>
          <p className="text-sm text-gray-500">
            {payload[0].value > sensorData.ranges.max ? 'Above Range' :
             payload[0].value < sensorData.ranges.min ? 'Below Range' : 'Within Range'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="space-y-6 pt-8">
          <DialogHeader className="mb-6">
            <DialogTitle>
              <div className="flex items-center space-x-4">
                <span className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium",
                  `bg-${sensorData.color}-100/50 text-${sensorData.color}-700`
                )}>
                  {sensorData.name}
                </span>
                <span className="text-gray-500">Detailed Analysis</span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
            {/* Current Reading */}
            <div className="bg-white/50 rounded-2xl p-6 border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 mb-1">Current Reading</p>
                  <p className={cn(
                    "text-4xl font-bold",
                    `text-${sensorData.color}-600`
                  )}>
                    {sensorData.value} {sensorData.unit}
                  </p>
                </div>
                <div className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium",
                  sensorData.value > sensorData.ranges.max || sensorData.value < sensorData.ranges.min
                    ? 'bg-red-100/50 text-red-700'
                    : 'bg-green-100/50 text-green-700'
                )}>
                  {sensorData.value > sensorData.ranges.max ? 'Above Range' :
                   sensorData.value < sensorData.ranges.min ? 'Below Range' : 'Within Range'}
                </div>
              </div>
            </div>

            {/* Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">24-Hour Trend</h3>
              <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 h-[400px]">
                <ResponsiveContainer>
                  <LineChart 
                    data={historicalData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#f0f0f0"
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={formatDate}
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[
                        Math.floor(sensorData.ranges.min - 5),
                        Math.ceil(sensorData.ranges.max + 5)
                      ]}
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    
                    {/* Reference Lines for Thresholds */}
                    <ReferenceLine 
                      y={sensorData.ranges.max} 
                      stroke="#ef4444" 
                      strokeDasharray="3 3"
                      label={{ 
                        value: 'Max', 
                        position: 'right',
                        fill: '#ef4444',
                        fontSize: 12
                      }}
                    />
                    <ReferenceLine 
                      y={sensorData.ranges.min} 
                      stroke="#ef4444" 
                      strokeDasharray="3 3"
                      label={{ 
                        value: 'Min', 
                        position: 'right',
                        fill: '#ef4444',
                        fontSize: 12
                      }}
                    />
                    <ReferenceLine 
                      y={sensorData.ranges.optimal} 
                      stroke="#22c55e" 
                      strokeDasharray="3 3"
                      label={{ 
                        value: 'Optimal', 
                        position: 'right',
                        fill: '#22c55e',
                        fontSize: 12
                      }}
                    />

                    <Line
                      name={sensorData.name}
                      type="monotone"
                      dataKey="value"
                      stroke={`var(--${sensorData.color}-600)`}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ 
                        r: 6,
                        stroke: 'white',
                        strokeWidth: 2,
                        fill: `var(--${sensorData.color}-600)`
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Thresholds */}
            <div className="pb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Threshold Information</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Minimum', value: sensorData.ranges.min },
                  { label: 'Optimal', value: sensorData.ranges.optimal },
                  { label: 'Maximum', value: sensorData.ranges.max }
                ].map(threshold => (
                  <div 
                    key={threshold.label}
                    className={cn(
                      "p-6 rounded-2xl text-center border transition-colors",
                      threshold.label === 'Optimal' 
                        ? 'bg-green-50/50 border-green-100' 
                        : 'bg-white/50 border-gray-100'
                    )}
                  >
                    <p className="text-gray-500 mb-2">{threshold.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {threshold.value} {sensorData.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SensorDetailModal; 