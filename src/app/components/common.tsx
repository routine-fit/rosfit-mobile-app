import styled from 'styled-components/native';

export const FlexGrowSpacer = styled.View<{ marginBottom?: number }>`
  flex-grow: 1;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 0}px;
`;

export const Divider = styled.View<{
  marginTop?: number;
  marginBottom?: number;
  hasWidth?: boolean;
}>`
  margin-top: ${({ marginTop }) => marginTop ?? 8}px;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 8}px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.stroke.default};
  width: ${({ hasWidth }) => (hasWidth ? '100%' : 'auto')};
`;

/**
 * Reusable component for adding a gap space between components.
 * @param {number} space - By default is 8px.
 */
export const GapContainer = styled.View<{ space?: number }>`
  gap: ${({ space }) => space ?? 8}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Spacer = styled.View<{
  horizontal?: boolean;
  vertical?: boolean;
  size: number;
}>`
  ${({ horizontal, size }) => horizontal && `width: ${size}px;`}
  ${({ vertical, size }) => vertical && `height: ${size}px;`}
`;
