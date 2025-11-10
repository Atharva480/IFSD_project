import React from 'react';
const SkeletonLoader = ({ height = 200, width = '100%', borderRadius = 16 }) => (
  <div style={{
    height,
    width,
    borderRadius,
    background: 'linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)',
    animation: 'skeleton-loading 1.5s infinite',
    margin: '8px 0',
  }} />
);
export default SkeletonLoader;
