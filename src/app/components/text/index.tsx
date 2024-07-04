import styled, { useTheme } from 'styled-components/native';
import React from 'react';

import { getFontByWeight } from './font';
import {
  FontFamily,
  FontSizes,
  FontWeights,
  TextAlignValues,
  TextProps,
} from './types';

const Text: React.FC<TextProps> = ({
  color,
  fontWeight = 'medium',
  fontFamily = 'Roboto',
  fontSize = 'm',
  textAlign = 'left',
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
      textAlign={textAlign}
    >
      {children}
    </InnerText>
  );
};

const InnerText = styled.Text<{
  fontWeight: FontWeights;
  fontSize: FontSizes;
  fontFamily: FontFamily;
  textAlign: TextAlignValues;
  color?: string;
  stringStyles?: string;
}>`
  font-family: ${props => getFontByWeight(props.fontWeight, props.fontFamily)};
  color: ${props => props.color || props.theme.colors.content.subtle};
  font-size: ${props => props.theme.sizes.fontSize[props.fontSize][0]};
  line-height: ${props => props.theme.sizes.fontSize[props.fontSize][1]};
  text-align: ${props => props.textAlign || 'left'};
  ${props => props.stringStyles || ''}
`;

export default Text;
