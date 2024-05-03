import React, { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { IconProps } from '../types';

export const HomeIcon: FC<IconProps> = ({ width = 20, height = 17, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 17" fill="none">
      <Path d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z" fill={color} />
    </Svg>
  );
};
