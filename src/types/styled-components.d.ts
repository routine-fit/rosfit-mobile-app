import 'styled-components';

import { ExtendedTheme } from '../theme/types';

// Extend the default theme interface with your ExtendedTheme
declare module 'styled-components' {
  export interface DefaultTheme extends ExtendedTheme {}
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends ExtendedTheme {}
}
