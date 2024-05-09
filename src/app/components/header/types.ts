import { ReactNode } from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export interface HeaderProps {
  leftText?: string | ReactNode;
  headerLeft?: React.ReactNode;
  headerTitle?: NativeStackHeaderProps['options']['headerTitle'];
  rightText?: string;
  rightButton?: React.ReactNode;
  onPressLeft?: () => void;
}
