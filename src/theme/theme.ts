import { colors } from './colors';

export type ThemeColors = typeof colors;

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeColors;
  }
}

export type Theme = {
  colors: ThemeColors;
};
