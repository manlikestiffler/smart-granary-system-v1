import Icon from '@ant-design/icons';
import React from 'react';

const TemperatureSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a4 4 0 0 1 4 4v10.17a6 6 0 1 1-8 0V6a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10.17a4 4 0 1 0 4 0V6a2 2 0 0 0-2-2zm-1 13v-2h2v2h-2zm0-4V7h2v6h-2z"/>
  </svg>
);

const MoistureSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69zm0-2.83L4.93 7.93a10 10 0 1 0 14.14 0L12-.14z"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>
);

const GrainSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm6 14.14l-6 3.86-6-3.86V7.86l6-3.86 6 3.86v8.28z"/>
    <path d="M12 6l-4 2v8l4 2 4-2V8l-4-2zm2 9.17l-2 1.03-2-1.03V8.83l2-1.03 2 1.03v6.34z"/>
  </svg>
);

const PestSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
    <path d="M15 11h-2V9c0-.55-.45-1-1-1s-1 .45-1 1v2H9c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1z"/>
  </svg>
);

export const TemperatureIcon = props => <Icon component={TemperatureSvg} {...props} />;
export const MoistureIcon = props => <Icon component={MoistureSvg} {...props} />;
export const GrainIcon = props => <Icon component={GrainSvg} {...props} />;
export const PestIcon = props => <Icon component={PestSvg} {...props} />; 