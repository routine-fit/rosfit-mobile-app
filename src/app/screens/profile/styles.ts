import styled from 'styled-components/native';

export const HeaderBox = styled.View`
  padding: 16px;
  align-items: center;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SectionBox = styled.View`
  margin-vertical: 8px;
  padding-vertical: 20px;
  padding-horizontal: 28px;
  gap: 10px;
`;

export const InfoContainer = styled.View`
  padding-horizontal: 28px;
`;
