import { JSX } from 'react';

export interface MenuItemProps {
  icon: JSX.Element;
  label: string;
  onPress: () => void;
}
