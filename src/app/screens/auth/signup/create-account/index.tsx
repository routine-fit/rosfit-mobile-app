import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';

import {
  Button,
  ControlledTextInput,
  GapContainer,
  Heading,
  PasswordInput,
  ScreenContainer,
} from 'src/app/components';
import { RootStackParamList } from 'src/app/navigation/types';
import { useAppDispatch } from 'src/store';
import { startCreateFirebaseUser } from 'src/store/auth/thunks';

import { FormData, validationSchema } from './form-config';
import { Container } from './styles';

export const CreateAccountScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'CreateAccount'>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { email, password } = data;
      await dispatch(startCreateFirebaseUser({ email, password }));
      navigation.navigate('CompleteData');
    } catch (error: any) {
      Alert.alert(t('screens:signUp:error'), error.message);
    }
  };

  return (
    <ScreenContainer withKeyboardAvoidingView>
      <Container>
        <Heading
          title={t('screens:signUp.heading1')}
          type="h2"
          flexTitleAlign="center"
        />
        <GapContainer>
          <ControlledTextInput
            controller={{
              control,
              name: 'email',
            }}
          />
          <PasswordInput
            controller={{
              control,
              name: 'password',
            }}
          />
          <PasswordInput
            controller={{
              control,
              name: 'repeatPassword',
            }}
          />
        </GapContainer>
        <Button
          onPress={handleSubmit(onValidSubmit)}
          content={t('common:button.continue')}
          marginTop={25}
        />
      </Container>
    </ScreenContainer>
  );
};
