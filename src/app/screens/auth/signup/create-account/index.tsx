import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';

import {
  ControlledTextInput,
  GapContainer,
  PasswordInput,
} from 'src/app/components';
import { RootStackParamList } from 'src/app/navigation/types';
import { useAppDispatch } from 'src/store';
import { startCreateFirebaseUser } from 'src/store/auth/thunks';
import { commonStyles } from 'src/utils/styles';

import { FormData, validationSchema } from './form-config';

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
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}
        style={commonStyles.keyboardAvoidingView}
      >
        <Box padding={20} flex={1} justifyContent="center" mb="$12">
          <Text size="2xl" textAlign="center" mb="$12">
            {t('screens:signUp.heading1')}
          </Text>
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
            mt="$8"
            mb="$4"
            bgColor="$lime600"
          >
            <ButtonText>{t('common:button.continue')}</ButtonText>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
