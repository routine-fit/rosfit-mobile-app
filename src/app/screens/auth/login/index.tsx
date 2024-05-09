import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import {
  Button,
  ControlledTextInput,
  Divider,
  GapContainer,
  GoogleSignInButton,
  Heading,
  PasswordInput,
  ScreenContainer,
} from 'src/app/components';
import { RootState, useAppDispatch } from 'src/store';
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from 'src/store/auth/thunks';

import { Container } from './styles';
import { LoginForm, LoginProps } from './types';

export const LoginScreen = ({ navigation }: LoginProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.auth);

  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onValidSubmit: SubmitHandler<LoginForm> = async data => {
    try {
      const { email, password } = data;
      await dispatch(startLoginWithEmailPassword({ email, password }));
    } catch (error: any) {
      Alert.alert(t('screens:login:error'), error.message);
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
      navigation.navigate('Main', { screen: 'Home' });
    }
  }, [navigation, status]);

  return (
    <ScreenContainer>
      <Container>
        <Heading
          title={t('screens:login.heading1')}
          flexTitleAlign="center"
          type="h1"
        />
        <ControlledTextInput
          controller={{
            control,
            name: 'email',
            rules: {
              required: t('inputs:error.required', {
                field: t('inputs:label.email').toLowerCase(),
              }),
            },
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
        />
        <GapContainer space={16}>
          <Button
            content={t('common:button.login')}
            onPress={handleSubmit(onValidSubmit)}
          />
          <GoogleSignInButton onPress={handleGoogleSignIn} />
        </GapContainer>
        <Divider marginBottom={16} marginTop={16} />
        <Button
          content={t('screens:login.forgotPassword')}
          onPress={() => {}}
          variant="ghost"
        />
        <Button
          content={t('screens:login.createYourAccount')}
          onPress={() => navigation.navigate('CreateAccount')}
          variant="ghost"
        />
      </Container>
    </ScreenContainer>
  );
};
