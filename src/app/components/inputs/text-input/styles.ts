import styled, { css, ExecutionContext } from 'styled-components/native';
import { FastOmit } from 'styled-components/native/dist/types';
import { TextInput, TextProps } from 'react-native';

import { InputContainerProps } from './types';

const inputVariantsMap = (
  props: ExecutionContext &
    FastOmit<TextProps, keyof InputContainerProps> &
    InputContainerProps,
) => ({
  underline: css`
    border-bottom-width: 1px;
    border-color: ${props.theme.colors.stroke.underline};

    ${props.isFocused &&
    css`
      border-bottom-width: 2px;
    `}
  `,
  outlined: css`
    border: 1px solid ${props.theme.colors.stroke.default};
    border-radius: 8px;
    padding: 8px;

    ${props.isFocused &&
    css`
      border-width: 2px;
    `}
  `,

  rounded: css`
    border: 1px solid ${props.theme.colors.stroke.default};
    border-radius: 100px;
    padding: 10px 16px;

    ${props.isFocused &&
    css`
      border-width: 2px;
    `}
  `,
});

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const FakePlaceholderContainer = styled.TouchableHighlight`
  position: absolute;
  top: 20px;
  left: 6px;
`;

export const InputContainer = styled.View<InputContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  height: 48px;
  margin-top: 6px;
  margin-bottom: 4px;
  ${props => inputVariantsMap(props)[props.variant ?? 'outlined']}

  ${props =>
    props.error &&
    css`
      border-color: ${props.theme.colors.feedback.error.default};
    `};

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.stroke.focus};
    `};
`;

export const Input = styled.TextInput<{
  ref: React.RefObject<TextInput>;
}>`
  flex: 1;
  height: 40px;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  color: ${({ theme }) => theme.colors.content.strong};
`;

export const RightIconContainer = styled.TouchableOpacity<{
  hasTrailingIcon?: boolean;
}>`
  margin-left: ${({ hasTrailingIcon }) => (hasTrailingIcon ? '8px' : '0px')};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const LeftIconContainer = styled.View`
  margin-right: 8px;
  width: 48px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const BottomTextContainer = styled.View`
  gap: 4px;
`;
