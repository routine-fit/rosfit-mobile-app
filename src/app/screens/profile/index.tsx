import React from 'react';
import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonText, Divider, Text } from '@gluestack-ui/themed';

import { PasswordReadOnly } from 'src/app/components/inputs/password-read-only';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import { RootState } from 'src/store';
import { commonStyles } from 'src/utils/styles';

import { InfoBox } from './components/info-box';
import { ProfileSectionHeader } from './components/profile-section-header';

const deviceWidth = Dimensions.get('window').width;

export const ProfileScreen = () => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <ScrollView>
        <Box flexDirection="column" alignItems="center" flex={1}>
          <Box
            padding={'$6'}
            alignItems="center"
            gap={15}
            width={deviceWidth}
            bgColor="$light200"
          >
            <UserAvatar width={70} height={70} />
            <Text color="$textDark950">{displayName}</Text>
          </Box>
          <Box
            my="$2"
            paddingVertical="$5"
            paddingHorizontal="$7"
            gap={10}
            width={deviceWidth}
          >
            <ProfileSectionHeader
              title="Informacion de perfil"
              onEditPress={() => {}}
            />

            <Box paddingHorizontal="$7">
              <InfoBox value="Agustin" label="Nombre" />
              <InfoBox value="Carthery" label="Apellido" />
              <InfoBox value="Masculino" label="Genero" />
              <InfoBox value="agcarthery@gmail.com" label="Email" />
              <InfoBox value="01/01/1992" label="Fecha de nacimiento" />
            </Box>
            <Divider bg="$backgroundLight300" h={2} my="$1.5" />

            <ProfileSectionHeader
              title="Medidas corporales"
              onEditPress={() => {}}
            />
            <Box paddingHorizontal="$7">
              <InfoBox value="70kg" label="Peso" />
              <InfoBox value="179cm" label="Estatura" />
            </Box>
            <Divider bg="$backgroundLight300" h={2} my="$1.5" />

            <ProfileSectionHeader
              title="Preferencias de entrenamiento"
              onEditPress={() => {}}
            />
            <Box paddingHorizontal="$7">
              <InfoBox value="Fuerza" label="Tipo de entrenamiento" />
              <InfoBox value="90'" label="Tiempo de entrenamiento" />
              <InfoBox value="Medio" label="Intensidad de entrenamiento" />
              <InfoBox
                value="Aumento de masa muscular"
                label="Objetivos de entrenamiento"
              />
            </Box>
            <Divider bg="$backgroundLight300" h={2} my="$1.5" />

            <Box alignItems="center">
              <Text color="$textDark950">Contraseña</Text>
            </Box>
            <Box paddingHorizontal="$7">
              <Box gap="$1" marginVertical="$1.5">
                <PasswordReadOnly value="test" />
                <Text size="xs">Contraseña actual</Text>
                <Button
                  bgColor="$lime600"
                  width="$48"
                  height="$7"
                  my="$2"
                  onPress={() => {}}
                >
                  <ButtonText size="sm">Actualizar contraseña</ButtonText>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
