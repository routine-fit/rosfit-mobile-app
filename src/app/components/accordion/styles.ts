import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 2%;
  border-radius: 10px;
  margin-bottom: 2%;
  overflow: hidden;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.fill.section};
  height: 60px;
  align-items: center;
  border-radius: 10px;
  padding-horizontal: 20px;
  z-index: 1;
`;

export const Body = styled.View`
  padding: 15px;
  background-color: ${({ theme }) => theme.palette.neutral[200]};
  top: -8px;
  z-index: -1;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const ChevronCell = styled.View`
  flex-direction: row;
  gap: 10px;
`;
