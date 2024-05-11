import styled, { css } from 'styled-components/native';

export const MainContainer = styled.SafeAreaView<{ backgroundColor?: string }>`
  flex: 1;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.background};
`;

// Screen height - (Header height + 24 padding) to be exact at the bottom.
export const InnerContainer = styled.View<{
  withTopSpacing?: boolean;
  withHeight?: boolean;
  withoutVerticalPadding: boolean;
  height: number;
}>`
  padding: 20px;
  ${({ withoutVerticalPadding }) =>
    withoutVerticalPadding
      ? css`
          padding-top: 0px;
          padding-bottom: 0px;
        `
      : ''}
  ${({ withTopSpacing }) => (withTopSpacing ? 'padding-top: 80px;' : '')}
  ${({ withHeight, height }) =>
    withHeight
      ? css`
          height: ${Math.round(height)}px;
        `
      : css`
          flex: 1;
        `}
`;

export const InnerKeyboardContainer = styled.KeyboardAvoidingView<{
  withTopSpacing?: boolean;
}>`
  flex: 1;
  padding: 20px;
  ${({ withTopSpacing }) => (withTopSpacing ? 'padding-top: 80px;' : '')}
`;
