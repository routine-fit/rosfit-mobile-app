import { styled } from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CurvedContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  padding: 20px 15px 0px;
  border-bottom-left-radius: 15px;
  background-color: ${({ theme }) => theme.colors.primary.default};
`;

export const TitleWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

export const Content = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;
