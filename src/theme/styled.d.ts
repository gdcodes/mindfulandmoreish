import 'styled-components';
import { Colors } from './colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
  }
} 