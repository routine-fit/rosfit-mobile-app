import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView } from 'react-native';
import { Box, Button, ButtonText, Divider, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { GoogleSignInButton } from 'src/app/components/buttons';
import { ControlledInput, PasswordInput } from 'src/app/components/inputs';
import { commonStyles } from 'src/utils/styles';

export const LoginScreen = () => {
  // TODO: Type the navigation screens
  const { navigate } = useNavigation<any>();
  const { t } = useTranslation();

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
          {t('screens:login.heading1')}
        </Text>
        <ControlledInput
          controller={{
            control,
            name: 'email',
            rules: {
              required: t('inputs:error.required', {
                field: t('inputs:label.email').toLowerCase(),
              }),
            },
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
              required: t('inputs:error.required', {
                field: t('inputs:label.password').toLowerCase(),
              }),
            },
          }}
          formControlProps={{
            marginBottom: '$4',
          }}
        />
        <Button
          onPress={handleSubmit(onValidSubmit)}
          marginBottom="$4"
          bgColor="$lime600"
        >
          <ButtonText>{t('common:button.login')}</ButtonText>
        </Button>
        <GoogleSignInButton
          onPress={() => {
            Alert.prompt('Sign in with google');
          }}
        />
        <Divider bg="$backgroundLight300" h={1} my="$4" />
        <Button variant="link">
          <ButtonText fontSize="$sm" color="$lime700">
            {t('screens:login.forgotPassword')}
          </ButtonText>
        </Button>
        <Button variant="link">
          <ButtonText fontSize="$sm" color="$lime700">
            {t('screens:login.createYourAccount')}
          </ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};
