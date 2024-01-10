import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, SafeAreaView } from 'react-native';
import { Box, Button, ButtonText, Divider, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { GoogleSignInButton } from 'src/app/components/buttons';
import { ControlledInput, PasswordInput } from 'src/app/components/inputs';
import { commonStyles } from 'src/utils/styles';

export const LoginScreen = () => {
  // TODO: Type the navigation screens
  const { navigate } = useNavigation<any>();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onValidSubmit = () => {
    navigate('MainApp');
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <Box padding={20} flex={1} justifyContent="center">
        <Text size="3xl" textAlign="center">
          Login
        </Text>
        <ControlledInput
          controller={{
            control,
            name: 'email',
            rules: {
              required: 'El email es requerido',
            },
          }}
          label="Email"
          inputFieldProps={{
            placeholder: 'john.doe@example.com',
          }}
          formControlProps={{
            marginBottom: '$4',
          }}
        />
        <PasswordInput
          controller={{
            control,
            name: 'password',
            rules: {
              required: 'La contraseña es requerida',
            },
          }}
          label="Contraseña"
          formControlProps={{
            marginBottom: '$4',
          }}
        />
        <Button
          onPress={handleSubmit(onValidSubmit)}
          marginBottom="$4"
          bgColor="$lime600"
        >
          <ButtonText>Iniciar sesión</ButtonText>
        </Button>
        <GoogleSignInButton
          onPress={() => {
            Alert.prompt('Sign in with google');
          }}
        />
        <Divider bg="$backgroundLight300" h={1} my="$4" />
        <Button variant="link">
          <ButtonText fontSize="$sm" color="$lime700">
            Se olvido la contraseña?
          </ButtonText>
        </Button>
        <Button variant="link">
          <ButtonText fontSize="$sm" color="$lime700">
            Crea tu cuenta
          </ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};
