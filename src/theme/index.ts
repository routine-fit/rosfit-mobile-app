import { darkTheme } from './dark';
import { lightTheme } from './light';
import { sizes } from './sizes';
import { spacing } from './spacing';
import { ExtendedTheme } from './types';

export const LightTheme: ExtendedTheme = {
  dark: false,
  ...lightTheme,
  sizes,
  spacing,
};

export const DarkTheme: ExtendedTheme = {
  dark: true,
  sizes,
  spacing,
  ...darkTheme,
};
