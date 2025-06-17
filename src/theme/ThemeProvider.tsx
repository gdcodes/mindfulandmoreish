import React, { useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { colors } from './colors';
import GlobalStyles from './GlobalStyles';
import type { ThemeColors } from './theme';

export type Theme = {
  colors: ThemeColors;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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
