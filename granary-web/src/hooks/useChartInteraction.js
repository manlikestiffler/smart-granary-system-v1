import { useState, useCallback } from 'react';

export function useChartInteraction(initialDomain = 'all') {
  const [zoomDomain, setZoomDomain] = useState(null);
  const [brushDomain, setBrushDomain] = useState(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  const handleZoom = useCallback((domain) => {
    setZoomDomain(domain);
  }, []);

  const handleBrush = useCallback((domain) => {
    setBrushDomain(domain);
  }, []);

  const handleClick = useCallback((data) => {
    setSelectedDataPoint(data);
  }, []);

  const resetZoom = useCallback(() => {
    setZoomDomain(null);
    setBrushDomain(null);
  }, []);

  return {
    zoomDomain,
    brushDomain,
    selectedDataPoint,
    handleZoom,
    handleBrush,
    handleClick,
    resetZoom
  };
}