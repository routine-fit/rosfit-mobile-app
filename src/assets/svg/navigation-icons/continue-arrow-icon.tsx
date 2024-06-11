import { useTheme } from 'styled-components';
import React, { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { IconProps } from '../types';

export const ContinueArrowIcon: FC<IconProps> = ({
  width = 7,
  height = 12,
  color,
}) => {
  const theme = useTheme();
  const defaultColor = theme.colors.content.subtle;
  return (
    <Svg width={width} height={height} viewBox="0 0 7 12" fill="none">
      <Path
        d="M0.876343 11L5.87634 6L0.876343 1"
        stroke={color || defaultColor}
        stroke-opacity="0.9"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
