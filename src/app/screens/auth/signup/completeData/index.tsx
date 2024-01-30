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
import { useNavigation } from '@react-navigation/native';

import { ControlledInput } from 'src/app/components/inputs';
import { commonStyles } from 'src/utils/styles';

import { validationSchema } from './form-config';

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
};

export const CompleteDataScreen = () => {
  const { navigate } = useNavigation<any>();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: undefined,
    },
    resolver: yupResolver(validationSchema),
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { firstName, lastName, birthDate, gender } = data;
      // TODO: dispatch create userInfo
      navigate('Login');
    } catch (error: any) {
      Alert.alert(t('screens:signUp:error'), error.message);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={commonStyles.keyboardAvoidingView}
      >
        <Box padding={20} flex={1} justifyContent="center" mt="$6" mb="$8">
          <Text size="2xl" textAlign="center" mb="$4">
            {t('screens:completeData.heading1')}
          </Text>
          <ControlledInput
            controller={{
              control,
              name: 'firstName',
            }}
            formControlProps={{
              mb: '$4',
            }}
          />
          <ControlledInput
            controller={{
              control,
              name: 'lastName',
            }}
            formControlProps={{
              mb: '$4',
            }}
          />
          {/* TODO: datepicker implementation */}
          <ControlledInput
            controller={{
              control,
              name: 'birthDate',
            }}
            formControlProps={{
              mb: '$4',
            }}
          />
          {/* TODO: implement a select input */}
          <ControlledInput
            controller={{
              control,
              name: 'gender',
            }}
            formControlProps={{
              mb: '$4',
            }}
          />

          <Button
            onPress={handleSubmit(onValidSubmit)}
            mt="$4"
            bgColor="$lime600"
          >
            <ButtonText>{t('common:button.confirm')}</ButtonText>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
