import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView } from 'react-native';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { ControlledInput, PasswordInput } from 'src/app/components/inputs';
import { useAppDispatch } from 'src/store';
import { startCreateFirebaseUser } from 'src/store/auth/thunks';
import { commonStyles } from 'src/utils/styles';

import { validationSchema } from './form-config';

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const CreateAccountScreen = () => {
  const { navigate } = useNavigation<any>();
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
      navigate('CompleteData');
    } catch (error: any) {
      Alert.alert(t('screens:signUp:error'), error.message);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <Box padding={20} flex={1} justifyContent="center" mb="$12">
        <Text size="2xl" textAlign="center" mb="$12">
          {t('screens:signUp.heading1')}
        </Text>
        <ControlledInput
          controller={{
            control,
            name: 'email',
          }}
          formControlProps={{
            mb: '$4',
          }}
        />
        <PasswordInput
          controller={{
            control,
            name: 'password',
          }}
          formControlProps={{
            mb: '$4',
          }}
        />
        <PasswordInput
          controller={{
            control,
            name: 'repeatPassword',
          }}
          formControlProps={{
            mb: '$4',
          }}
        />
        <Button
          onPress={handleSubmit(onValidSubmit)}
          mt="$8"
          mb="$4"
          bgColor="$lime600"
        >
          <ButtonText>{t('common:button.continue')}</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};
