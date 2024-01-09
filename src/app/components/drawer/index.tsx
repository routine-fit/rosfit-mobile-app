import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Text } from '@gluestack-ui/themed';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { UserAvatar } from '@src/assets/svg/avatar/user-avatar';
import {
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from '@src/assets/svg/navigation-icons/';

const ROUTES = {
  HOME: 'HomeScreen',
  PROFILE: 'Profile',
  SETTINGS: 'SettingsScreen',
};

interface MenuItemProps {
  icon: JSX.Element;
  label: string;
  onPress: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Box
      flexDirection="row"
      gap={10}
      alignItems="center"
      paddingVertical={17}
      paddingHorizontal={5}>
      {icon}
      <Text size="md">{label}</Text>
    </Box>
  </TouchableOpacity>
);

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const handleLogout = () => {
    // TODO: dispatch logout
  };

  return (
    <Box flexDirection="column" flex={1}>
      <Box
        flexDirection="column"
        alignItems="center"
        paddingTop={40}
        paddingBottom={15}
        gap={10}
        borderBottomColor="$secondary300"
        borderBottomWidth={2}>
        <UserAvatar width={70} height={70} />
        <Text size="xl">username</Text>
      </Box>

      <Box padding={15}>
        {[
          { route: ROUTES.HOME, icon: <HomeIcon />, label: 'Home' },
          { route: ROUTES.PROFILE, icon: <ProfileIcon />, label: 'Profile' },
          { route: ROUTES.SETTINGS, icon: <SettingsIcon />, label: 'Settings' },
        ].map(({ route, icon, label }) => (
          <MenuItem
            key={route}
            icon={icon}
            label={label}
            onPress={() => navigation.navigate(route)}
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
