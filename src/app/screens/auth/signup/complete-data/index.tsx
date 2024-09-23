import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';

import {
  Button,
  ControlledDatePicker,
  ControlledSelectInput,
  ControlledTextInput,
  GapContainer,
  Heading,
  ScreenContainer,
} from 'src/app/components';
import { RootStackParamList } from 'src/app/navigation/types';
import { genderOptions } from 'src/constants/genders';
import { useTranslatedOptions } from 'src/hooks/useTranslatedOptions';
import { RootState, useAppDispatch } from 'src/store';
import { startCreateUserInfo } from 'src/store/auth/thunks';

import { FormData, validationSchema } from './form-config';
import { Container } from './styles';

export const CompleteDataScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'CompleteData'>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { uid } = useSelector((state: RootState) => state.auth);

  const genderOptionsTranslate = useTranslatedOptions(
    genderOptions,
    'common:gender',
  );

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      gender: undefined,
    },
    resolver: yupResolver(validationSchema),
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { firstName, lastName, birthDate, gender } = data;

      const userInfo = {
        firebaseUid: uid || '',
        name: firstName,
        lastName,
        birthDate,
        gender,
        pushNotification: false,
      };
      await dispatch(startCreateUserInfo(userInfo));
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert(t('screens:signUp:error'), error.message);
    }
  };

  return (
    <ScreenContainer withKeyboardAvoidingView>
      <Container>
        <Heading
          flexTitleAlign="center"
          bottomSpace={false}
          type="h2"
          title={t('screens:completeData.heading1')}
        />
        <Heading
          flexTitleAlign="center"
          type="h2"
          title={t('screens:completeData.heading2')}
        />
        <GapContainer>
          <ControlledTextInput
            controller={{
              control,
              name: 'firstName',
            }}
          />
          <ControlledTextInput
            controller={{
              control,
              name: 'lastName',
            }}
          />
          <ControlledDatePicker
            controller={{
              control,
              name: 'birthDate',
            }}
          />
          <ControlledSelectInput
            controller={{
              control,
              name: 'gender',
            }}
            options={genderOptionsTranslate}
          />
          <Button
            onPress={handleSubmit(onValidSubmit)}
            content={t('common:button.confirm')}
          />
        </GapContainer>
      </Container>
    </ScreenContainer>
  );
};
