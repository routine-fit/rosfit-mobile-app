import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
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
import { RootState, useAppDispatch } from 'src/store';
import { startUpdateTrainingPreferences } from 'src/store/profile/thunks';

import { FormData, validationSchema } from './form-config';
import { Container } from './styles';
import { EditTrainingPreferencesProps } from './types';

export const EditTrainingPreferencesScreen = ({
  navigation,
}: EditTrainingPreferencesProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { trainingPreference } = useSelector(
    (state: RootState) => state.profile,
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
      id: trainingPreference?.id,
      type: trainingPreference?.type,
      intensity: trainingPreference?.intensity,
      time: trainingPreference?.time,
    },
    resolver: yupResolver(validationSchema),
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      await dispatch(startUpdateTrainingPreferences(data));
      // onClose();
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
              options={trainingTypeOptions}
            />

            <ControlledSelectInput
              controller={{
                control,
                name: 'intensity',
              }}
              options={trainingIntensityOptions}
            />

            <ControlledTextInput
              controller={{
                control,
                name: 'time',
              }}
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
