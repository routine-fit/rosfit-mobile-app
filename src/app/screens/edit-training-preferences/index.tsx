import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  ControlledSelectInput,
  ControlledTextInput,
  GapContainer,
  Heading,
  ScreenContainer,
} from 'src/app/components';
import { useTranslatedOptions } from 'src/hooks/useTranslatedOptions';
import { useAppDispatch, useAppSelector } from 'src/store';
import { updateTrainingPreferences } from 'src/store/profile/profile.thunks';

import { FormData, validationSchema } from './form-config';
import { Container } from './styles';
import { EditTrainingPreferencesProps } from './types';

export const EditTrainingPreferencesScreen = ({
  navigation,
}: EditTrainingPreferencesProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const trainingPreference = useAppSelector(
    state => state.profile.trainingPreference,
  );

  const trainingIntensityOptions = useTranslatedOptions(
    ['LOW', 'MEDIUM', 'HIGH'],
    'common:trainingIntensity',
  );

  const trainingTypeOptions = useTranslatedOptions(
    ['AGILITY', 'STRENGTH', 'ENDURANCE', 'FLEXIBILITY', 'BALANCE', 'CARDIO'],
    'common:trainingType',
  );

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      id: trainingPreference?.id || '',
      type: trainingPreference?.type || '',
      intensity: trainingPreference?.intensity || '',
      time: trainingPreference?.time.toString() || '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const trainingData = {
        ...data,
        time: Number(data.time),
      };
      await dispatch(updateTrainingPreferences(trainingData));
      navigation.navigate('Profile');
    } catch (error: any) {
      Alert.alert(t('screens:editTrainingPreferences:error'), error.message);
    }
  };

  return (
    <ScreenContainer withKeyboardAvoidingView withoutVerticalPadding>
      <ScrollView>
        <Container>
          <Heading
            title={t('screens:editTrainingPreferences.heading1')}
            flexTitleAlign="center"
            bottomSpace={false}
          />
          <Heading
            title={t('screens:editTrainingPreferences.heading2')}
            flexTitleAlign="center"
          />
          <GapContainer>
            <ControlledSelectInput
              controller={{
                control,
                name: 'type',
              }}
              label={t('inputs:label.trainingType')}
              options={trainingTypeOptions}
            />

            <ControlledSelectInput
              controller={{
                control,
                name: 'intensity',
              }}
              label={t('inputs:label.trainingIntensity')}
              options={trainingIntensityOptions}
            />

            <ControlledTextInput
              controller={{
                control,
                name: 'time',
              }}
              label={t('inputs:label.trainingTime')}
            />

            <GapContainer space={15}>
              <Button
                onPress={handleSubmit(onValidSubmit)}
                content={t('common:button.confirm')}
                size="m"
              />
              <Button
                onPress={navigation.goBack}
                content={t('common:button.cancel')}
                themeColor="error"
                size="m"
              />
            </GapContainer>
          </GapContainer>
        </Container>
      </ScrollView>
    </ScreenContainer>
  );
};
