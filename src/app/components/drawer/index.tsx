import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import Text from 'src/app/components/text';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import {
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from 'src/assets/svg/navigation-icons/';
import { RootState, useAppDispatch } from 'src/store';
import { startLogoutUser } from 'src/store/auth/thunks';

import { MenuItem } from './components/menu-item';
import {
  DrawerContainer,
  LogoutContainer,
  MenuContainer,
  ProfileInfoContainer,
} from './styles';

const DrawerContent: FC<DrawerContentComponentProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { displayName } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(startLogoutUser());
    navigation.navigate('Login');
  };

  const navRoutes = useMemo(
    () => [
      {
        route: 'Main',
        params: { screen: 'Home' },
        icon: <HomeIcon color={theme.colors.primary.default} />,
        label: 'Home',
      },
      {
        route: 'Profile',
        icon: <ProfileIcon color={theme.colors.primary.default} />,
        label: 'Profile',
      },
      {
        route: 'Settings',
        icon: <SettingsIcon color={theme.colors.primary.default} />,
        label: 'Settings',
      },
    ],
    [theme.colors.primary.default],
  );

  return (
    <DrawerContainer>
      <ProfileInfoContainer>
        <UserAvatar width={70} height={70} />
        <Text fontSize="xl">{displayName}</Text>
      </ProfileInfoContainer>

      <MenuContainer>
        {navRoutes.map(({ route, params, icon, label }) => (
          <MenuItem
            key={route}
            icon={React.cloneElement(icon, {
              color: theme.palette.primary[500],
            })}
            label={label}
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: route, params }] })
            }
          />
        ))}
      </MenuContainer>

      <LogoutContainer>
        <MenuItem icon={<LogoutIcon />} label="Logout" onPress={handleLogout} />
      </LogoutContainer>
    </DrawerContainer>
  );
};

export default DrawerContent;
