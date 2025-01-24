import { useCallback } from 'react';

export function useDataExport() {
  const exportToCSV = useCallback((data, filename = 'sensor-data.csv') => {
    if (!data.length) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(reading => 
      Object.values(reading).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    );

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  return { exportToCSV };
}