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
import { genderOptions } from 'src/constants/genders';
import { useTranslatedOptions } from 'src/hooks/useTranslatedOptions';
import { ProfileData } from 'src/interfaces/profile-data';
import profileDataFile from 'src/mocks/profile-data.json';

import { formConfig, FormData } from './form-config';
import { Container } from './styles';
import { EditPersonalInfoProps } from './types';

export const EditPersonalInfoScreen = ({
  navigation,
}: EditPersonalInfoProps) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { t } = useTranslation();

  const genderOptionsTranslate = useTranslatedOptions(
    genderOptions,
    'common:gender',
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
    <ScreenContainer withKeyboardAvoidingView withoutVerticalPadding>
      <ScrollView>
        <Container>
          <Heading
            title={t('screens:editPersonalData.heading1')}
            flexTitleAlign="center"
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
            <ControlledTextInput
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
