import React, { createContext, useContext, useEffect } from 'react';
import { theme as antdTheme } from 'antd';
import { useSettings } from './SettingsContext';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { settings } = useSettings();
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  const isDark = settings.display.theme === 'dark' || 
    (settings.display.theme === 'system' && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);

  const theme = {
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: isDark ? '#4ade80' : '#22c55e',
      colorBgContainer: isDark ? '#1e293b' : '#ffffff',
      borderRadius: 8,
    },
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <antdTheme.Provider theme={theme}>
      {children}
    </antdTheme.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 