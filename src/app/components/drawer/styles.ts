import styled from 'styled-components/native';

export const DrawerContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ProfileInfoContainer = styled.View`
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 15px;
  gap: 10px;
  border-bottom-color: ${({ theme }) => theme.colors.stroke.default};
  border-bottom-width: 2px;
`;

export const MenuContainer = styled.View`
  padding: 15px;
`;

export const LogoutContainer = styled.View`
  justify-content: flex-end;
  flex: 1;
  padding-horizontal: 10px;
`;
