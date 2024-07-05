import { useTheme } from 'styled-components';
import React, { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

import { IconProps } from '../types';

export const EditIcon: FC<IconProps> = ({ width = 18, height = 18, color }) => {
  const theme = useTheme();
  const strokeColor = color || theme.colors.primary.default;
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        d="M8.25 3H3C2.60218 3 2.22064 3.15803 1.93934 3.43934C1.65803 3.72065 1.5 4.10218 1.5 4.5V15C1.5 15.3978 1.65803 15.7793 1.93934 16.0606C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2793 16.342 14.5606 16.0606C14.842 15.7793 15 15.3978 15 15V9.75"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.875 1.87502C14.1733 1.57665 14.578 1.40903 15 1.40903C15.422 1.40903 15.8267 1.57665 16.125 1.87502C16.4233 2.17339 16.591 2.57806 16.591 3.00002C16.591 3.42197 16.4233 3.82665 16.125 4.12502L9 11.25L6 12L6.75 9.00001L13.875 1.87502Z"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
