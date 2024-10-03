import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import Text from 'src/app/components/text';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import {
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from 'src/assets/svg/navigation-icons/';
import { useAppDispatch, useAppSelector } from 'src/store';
import { logoutUser } from 'src/store/auth/auth.thunks';

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
  const { name, lastName } = useAppSelector(
    state => state.profile.personalInformation,
  );

  const handleLogout = async () => {
    await dispatch(logoutUser());
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
        <UserAvatar
          width={70}
          height={70}
          color={theme.colors.feedback.info.default}
        />
        <Text fontSize="xl">{`${name} ${lastName}`}</Text>
      </ProfileInfoContainer>

      <MenuContainer>
        {navRoutes.map(({ route, params, icon, label }) => (
          <MenuItem
            key={route}
            icon={React.cloneElement(icon, {
              color: theme.colors.primary.default,
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
