import React, { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const RoutineIcon: FC<Props> = ({ width = 24, height = 24, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 17V8H7V17H21ZM21 3C21.5304 3 22.0391 3.21071 22.4142 3.58579C22.7893 3.96086 23 4.46957 23 5V17C23 17.5304 22.7893 18.0391 22.4142 18.4142C22.0391 18.7893 21.5304 19 21 19H7C6.46957 19 5.96086 18.7893 5.58579 18.4142C5.21071 18.0391 5 17.5304 5 17V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H8V1H10V3H18V1H20V3H21ZM3 21H17V23H3C2.46957 23 1.96086 22.7893 1.58579 22.4142C1.21071 22.0391 1 21.5304 1 21V9H3V21ZM19 15H15V11H19V15Z"
        fill={color}
      />
    </Svg>
  );
};
