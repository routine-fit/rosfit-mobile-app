import React, { useEffect, useState } from 'react';
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
import { EditPersonalInfoProps } from './types';

export const EditPersonalInfoScreen = ({
  navigation,
}: EditPersonalInfoProps) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { t } = useTranslation();

  const genderOptions = [
    { label: t('common:gender.male'), value: 'MALE' },
    { label: t('common:gender.female'), value: 'FEMALE' },
  ];

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
          firstName: data?.name || '',
          lastName: data?.lastName || '',
          birthDate: data?.birthDate || '',
          gender: data?.gender || '',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [profileData, reset]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      //TODO: dispatch thunks
    } catch (error: any) {
      Alert.alert(t('screens:editPersonalData:error'), error.message);
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
              <Text size="2xl" color="$textDark950">
                {t('screens:editPersonalData.heading1')}
              </Text>
            </Box>
            <Box>
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
                <ControlledTextInput
                  controller={{
                    control,
                    name: 'birthDate',
                  }}
                />
                <ControlledSelect
                  controller={{
                    control,
                    name: 'gender',
                  }}
                  options={genderOptions}
                />
                <Button onPress={navigation.goBack} bgColor="$error500">
                  <ButtonText>{t('common:button.cancel')}</ButtonText>
                </Button>
                <Button
                  onPress={handleSubmit(onValidSubmit)}
                  bgColor="$lime700"
                >
                  <ButtonText>{t('common:button.confirm')}</ButtonText>
                </Button>
              </GapContainer>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
