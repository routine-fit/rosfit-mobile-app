import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonText, Divider, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { GoogleSignInButton } from 'src/app/components/buttons';
import { ControlledInput, PasswordInput } from 'src/app/components/inputs';
import { RootState, useAppDispatch } from 'src/store';
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from 'src/store/auth/thunks';
import { commonStyles } from 'src/utils/styles';

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  // TODO: Type the navigation screens
  const { navigate } = useNavigation<any>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.auth);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { email, password } = data;
      await dispatch(startLoginWithEmailPassword({ email, password }));
    } catch (error: any) {
      Alert.alert('Authentication Failed', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(startGoogleSignIn());
    } catch (error: any) {
      Alert.alert(
        'Google Sign-In Failed',
        error.message || 'An error occurred during Google Sign-In',
      );
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('Main');
    }
  }, [navigate, status]);

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
        <GoogleSignInButton onPress={handleGoogleSignIn} />
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
