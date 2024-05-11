import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Box, ButtonText, Text } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';

import {
  ControlledSelect,
  ControlledTextInput,
  GapContainer,
} from 'src/app/components';
import { ProfileData } from 'src/interfaces/profile-data';
import profileDataFile from 'src/mocks/profile-data.json';
import { commonStyles } from 'src/utils/styles';

import { formConfig, FormData } from './form-config';
import { EditTrainingPreferencesProps } from './types';

export const EditTrainingPreferencesScreen = ({
  navigation,
}: EditTrainingPreferencesProps) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { t } = useTranslation();

  const trainingIntensityOptions = useMemo(
    () => [
      { label: t('common:trainingIntensity.low'), value: 'LOW' },
      { label: t('common:trainingIntensity.medium'), value: 'MEDIUM' },
      { label: t('common:trainingIntensity.high'), value: 'HIGH' },
    ],
    [t],
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
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}
        style={commonStyles.keyboardAvoidingView}
      >
        <ScrollView>
          <Box flex={1} paddingVertical="$10" paddingHorizontal="$12">
            <Box alignItems="center" padding="$2" mb="$6">
              <Text size="2xl" color="$textDark950" textAlign="center">
                {t('screens:editTrainingPreferences.heading1')}
              </Text>
            </Box>
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
              <ControlledSelect
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
              <Button onPress={navigation.goBack} bgColor="$error500">
                <ButtonText>{t('common:button.cancel')}</ButtonText>
              </Button>
              <Button onPress={handleSubmit(onValidSubmit)} bgColor="$lime700">
                <ButtonText>{t('common:button.confirm')}</ButtonText>
              </Button>
            </GapContainer>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
