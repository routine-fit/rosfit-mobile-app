import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView } from 'react-native';

import {
  Button,
  ControlledSelectInput,
  ControlledTextInput,
  GapContainer,
  Heading,
  ScreenContainer,
} from 'src/app/components';
import { useTranslatedOptions } from 'src/hooks/useTranslatedOptions';
import { ProfileData } from 'src/interfaces/profile-data';
import profileDataFile from 'src/mocks/profile-data.json';

import { formConfig, FormData } from './form-config';
import { Container } from './styles';
import { EditTrainingPreferencesProps } from './types';

export const EditTrainingPreferencesScreen = ({
  navigation,
}: EditTrainingPreferencesProps) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { t } = useTranslation();

  const trainingIntensityOptions = useTranslatedOptions(
    ['LOW', 'MEDIUM', 'HIGH'],
    'common:trainingIntensity',
  );

  const { control, handleSubmit, reset } = useForm<FormData>(formConfig);

  const fetchProfileData = (): Promise<ProfileData> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(profileDataFile);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
        reset({
          trainingType: data?.trainingType || '',
          trainingTime: data?.trainingTime || '',
          trainingIntensity: data?.trainingIntensity || '',
          trainingGoals: data?.trainingGoals || '',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [profileData, reset]);

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      //TODO: dispatch thunks
      console.log(data);
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
            <ControlledTextInput
              controller={{
                control,
                name: 'trainingType',
              }}
            />
            <ControlledTextInput
              controller={{
                control,
                name: 'trainingTime',
              }}
            />
            <ControlledSelectInput
              controller={{
                control,
                name: 'trainingIntensity',
              }}
              options={trainingIntensityOptions}
            />
            <ControlledTextInput
              controller={{
                control,
                name: 'trainingGoals',
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
