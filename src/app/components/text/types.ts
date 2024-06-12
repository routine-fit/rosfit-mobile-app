import { TextProps as RNTextProps } from 'react-native';

export type FontFamily = 'Roboto';

export type FontWeights = 'light' | 'medium' | 'semiBold' | 'bold';

export type FontSizes =
  | '5xl'
  | '4xl'
  | '3xl'
  | '2xl'
  | 'xl'
  | 'lg'
  | 'm'
  | 'sm'
  | 'xs'
  | 'xxs';

export interface TextProps extends RNTextProps {
  color?: string;
  fontFamily?: FontFamily;
  children?: React.ReactNode;
  fontWeight?: FontWeights;
  fontSize?: FontSizes;
  stringStyles?: string;
}
