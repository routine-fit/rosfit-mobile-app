import { ReactNode } from 'react';

export interface HeaderProps {
  leftText?: string | ReactNode;
  headerLeft?: React.ReactNode;
  headerTitle?: string | ReactNode;
  rightText?: string;
  rightButton?: React.ReactNode;
  onPressLeft?: () => void;
}
