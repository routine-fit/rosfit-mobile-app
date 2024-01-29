import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView } from 'react-native';
// import { useSelector } from 'react-redux';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { ControlledInput, PasswordInput } from 'src/app/components/inputs';
// import { useAppDispatch } from 'src/store';
// import { startCreateFirebase } from 'src/store/auth/thunks';
import { commonStyles } from 'src/utils/styles';

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const CreateAccountScreen = () => {
  // TODO: Type the navigation screens
  const { navigate } = useNavigation<any>();
  const { t } = useTranslation();
  // const dispatch = useAppDispatch();
  // const { status } = useSelector((state: RootState) => state.auth);

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { email, password } = data;
      console.log(email, password);
      // await dispatch(startCreateFirebase({ email, password }));
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
            rules: {
              required: t('inputs:error.required', {
                field: t('inputs:label.email').toLowerCase(),
              }),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: t('inputs:error.emailFormat'),
              },
            },
          }}
          formControlProps={{
            mb: '$4',
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
              minLength: {
                value: 6,
                message: t('inputs:error.passwordMinLength', {
                  field: t('inputs:label.password').toLowerCase(),
                  min: 6,
                }),
              },
            },
          }}
          formControlProps={{
            mb: '$4',
          }}
        />
        <PasswordInput
          controller={{
            control,
            name: 'repeatPassword',
            rules: {
              required: t('inputs:error.required', {
                field: t('inputs:label.repeatPassword').toLowerCase(),
              }),
              validate: value => {
                if (watch('password') !== value) {
                  return t('inputs:error.passwordMatch');
                }
              },
            },
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
