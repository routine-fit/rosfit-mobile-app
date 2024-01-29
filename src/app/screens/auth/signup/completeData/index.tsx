import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView } from 'react-native';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { ControlledInput } from 'src/app/components/inputs';
// import { useAppDispatch } from 'src/store';
// import { startCreateFirebase } from 'src/store/auth/thunks';
import { commonStyles } from 'src/utils/styles';

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'male' | 'female' | undefined;
};

export const CompleteDataScreen = () => {
  const { navigate } = useNavigation<any>();
  const { t } = useTranslation();
  // const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: undefined,
    },
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { firstName, lastName, birthDate, gender } = data;
      console.log(firstName, lastName, birthDate, gender);

      // await dispatch(startCreateFirebase({ email, password }));
      navigate('Login');
    } catch (error: any) {
      Alert.alert(t('screens:signUp:error'), error.message);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <Box padding={20} flex={1} justifyContent="center" mt="$6" mb="$8">
        <Text size="2xl" textAlign="center" mb="$4">
          {t('screens:completeData.heading1')}
        </Text>
        <ControlledInput
          controller={{
            control,
            name: 'firstName',
            rules: {
              required: t('inputs:error.required', {
                field: t('inputs:label.firstName').toLowerCase(),
              }),
              minLength: {
                value: 2,
                message: t('inputs:error.nameMinLength', {
                  field: t('inputs:label.firstName').toLowerCase(),
                  min: 2,
                }),
              },
            },
          }}
          formControlProps={{
            mb: '$4',
          }}
        />
        <ControlledInput
          controller={{
            control,
            name: 'lastName',
            rules: {
              required: t('inputs:error.required', {
                field: t('inputs:label.lastName').toLowerCase(),
              }),
              minLength: {
                value: 2,
                message: t('inputs:error.nameMinLength', {
                  field: t('inputs:label.lastName').toLowerCase(),
                  min: 2,
                }),
              },
            },
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
            rules: {
              required: t('inputs:error.required', {
                field: t('inputs:label.birthDate').toLowerCase(),
              }),
            },
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
            rules: {
              required: t('inputs:error.required', {
                field: t('inputs:label.gender').toLowerCase(),
              }),
            },
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
    </SafeAreaView>
  );
};
