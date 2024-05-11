import styled, { useTheme } from 'styled-components/native';
import React from 'react';

import { getFontByWeight } from './font';
import { FontFamily, FontSizes, FontWeights, TextProps } from './types';

const Text: React.FC<TextProps> = ({
  color,
  fontWeight = 'medium',
  fontFamily = 'Roboto',
  fontSize = 'm',
  children,
  style,
  stringStyles,
  ...others
}) => {
  const theme = useTheme();

  return (
    <InnerText
      {...others}
      fontFamily={theme.font || fontFamily}
      fontWeight={fontWeight}
      stringStyles={stringStyles}
      fontSize={fontSize}
      style={style}
      color={color}
    >
      {children}
    </InnerText>
  );
};

const InnerText = styled.Text<{
  fontWeight: FontWeights;
  fontSize: FontSizes;
  fontFamily: FontFamily;
  color?: string;
  stringStyles?: string;
}>`
  font-family: ${props => getFontByWeight(props.fontWeight, props.fontFamily)};
  color: ${props => props.color || props.theme.colors.content.subtle};
  font-size: ${props => props.theme.sizes.fontSize[props.fontSize][0]};
  line-height: ${props => props.theme.sizes.fontSize[props.fontSize][1]};
  ${props => props.stringStyles || ''}
`;

export default Text;
