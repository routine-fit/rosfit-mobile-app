import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@gluestack-ui/themed';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import {
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from 'src/assets/svg/navigation-icons/';
import { RootState, useAppDispatch } from 'src/store';
import { startLogoutUser } from 'src/store/auth/thunks';

import Text from '../text';
import { MenuItem } from './components/menu-item';

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
    <Box flexDirection="column" flex={1}>
      <Box
        flexDirection="column"
        alignItems="center"
        paddingTop={40}
        paddingBottom={15}
        gap={10}
        borderBottomColor="$secondary300"
        borderBottomWidth={2}
      >
        <UserAvatar width={70} height={70} />
        <Text fontSize="xl">{displayName}</Text>
      </Box>

      <Box padding={15}>
        {navRoutes.map(({ route, params, icon, label }) => (
          <MenuItem
            key={route}
            icon={icon}
            label={label}
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: route, params }] })
            }
          />
        ))}
      </Box>

      <Box justifyContent="flex-end" flex={1} paddingHorizontal={10}>
        <MenuItem icon={<LogoutIcon />} label="Logout" onPress={handleLogout} />
      </Box>
    </Box>
  );
};

export default DrawerContent;
