import React, { useMemo, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { colors } from './colors';
import GlobalStyles from './GlobalStyles';
import type { ThemeColors } from './theme';
import Clarity from '@microsoft/clarity';

export type Theme = {
  colors: ThemeColors;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize Clarity analytics in production
  useEffect(() => {
    if (typeof window !== 'undefined' && 
        window.location?.hostname !== 'localhost' && 
        process.env.CLARITY_PROJECT_ID) {
      Clarity.init(process.env.CLARITY_PROJECT_ID);
    }
  }, []);

  // Memoize the theme object to prevent unnecessary re-renders
  const themeValue = useMemo<Theme>(() => ({
    colors: {
      ...colors
    }
  }), []);
  
  return (
    <EmotionThemeProvider theme={themeValue}>
      <GlobalStyles />
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
