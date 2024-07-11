import { useTheme } from 'styled-components';
import React, { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { IconProps } from '../types';

export const BackArrowIcon: FC<IconProps> = ({
  width = 26,
  height = 26,
  color,
}) => {
  const theme = useTheme();
  const strokeColor = color || theme.colors.background;
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M12.6667 8H3.33334"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.00001 12.6666L3.33334 7.99998L8.00001 3.33331"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
