import React, { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

export const SettingsIcon: FC<Props> = ({ width = 21, height = 20 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
      <Path
        d="M7.3 20L6.9 16.8C6.68333 16.7167 6.479 16.6167 6.287 16.5C6.095 16.3833 5.90767 16.2583 5.725 16.125L2.75 17.375L0 12.625L2.575 10.675C2.55833 10.5583 2.55 10.4457 2.55 10.337V9.663C2.55 9.55433 2.55833 9.44167 2.575 9.325L0 7.375L2.75 2.625L5.725 3.875C5.90833 3.74167 6.1 3.61667 6.3 3.5C6.5 3.38333 6.7 3.28333 6.9 3.2L7.3 0H12.8L13.2 3.2C13.4167 3.28333 13.621 3.38333 13.813 3.5C14.005 3.61667 14.1923 3.74167 14.375 3.875L17.35 2.625L20.1 7.375L17.525 9.325C17.5417 9.44167 17.55 9.55433 17.55 9.663V10.337C17.55 10.4457 17.5333 10.5583 17.5 10.675L20.075 12.625L17.325 17.375L14.375 16.125C14.1917 16.2583 14 16.3833 13.8 16.5C13.6 16.6167 13.4 16.7167 13.2 16.8L12.8 20H7.3ZM10.1 13.5C11.0667 13.5 11.8917 13.1583 12.575 12.475C13.2583 11.7917 13.6 10.9667 13.6 10C13.6 9.03333 13.2583 8.20833 12.575 7.525C11.8917 6.84167 11.0667 6.5 10.1 6.5C9.11667 6.5 8.28733 6.84167 7.612 7.525C6.93667 8.20833 6.59933 9.03333 6.6 10C6.6 10.9667 6.93733 11.7917 7.612 12.475C8.28667 13.1583 9.116 13.5 10.1 13.5Z"
        fill="#4D7C0F"
      />
    </Svg>
  );
};
