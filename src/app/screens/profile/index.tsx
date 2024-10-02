import { format } from 'date-fns';
import { useTheme } from 'styled-components/';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView } from 'react-native';

import {
  Divider,
  ScreenContainer,
  SharedModal,
  Text,
} from 'src/app/components';
import { CustomActivityIndicator } from 'src/app/components/activity-indicator';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import { useAppDispatch, useAppSelector } from 'src/store';
import { startGetMyInformation } from 'src/store/profile/profile.thunks';
import { commonStyles } from 'src/utils/styles';

import { InfoBox } from './components/info-box';
import { ModalContent } from './components/modal-content';
import { ProfileSectionHeader } from './components/profile-section-header';
import { HeaderBox, InfoContainer, SectionBox } from './styles';
import { ProfileScreenProps } from './types';

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    personalInformation,
    trainingPreference,
    growRecords,
    status: profileStatus,
  } = useAppSelector(state => state.profile);

  const { email } = useAppSelector(state => state.auth);

  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    dispatch(startGetMyInformation());
  }, [dispatch]);

  if (profileStatus === 'loading') {
    return (
      <ScreenContainer withoutVerticalPadding>
        <CustomActivityIndicator
          width={150}
          height={150}
          isCentered
          fullScreen
        />
      </ScreenContainer>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <ScrollView>
        <HeaderBox>
          <UserAvatar
            width={70}
            height={70}
            color={theme.colors.feedback.info.default}
          />
          <Text>{`${personalInformation?.name} ${personalInformation?.lastName}`}</Text>
        </HeaderBox>
        <SectionBox>
          <ProfileSectionHeader
            title={t('screens:profileScreen.profileInfo')}
            onEditPress={() => navigation.navigate('EditPersonalInfo')}
          />
          <InfoContainer>
            <InfoBox
              value={personalInformation?.name}
              label={t('inputs:label.firstName')}
            />
            <InfoBox
              value={personalInformation?.lastName}
              label={t('inputs:label.lastName')}
            />
            <InfoBox
              value={t(`common:gender.${personalInformation?.gender}`)}
              label={t('inputs:label.gender')}
            />
            <InfoBox value={email} label={t('inputs:label.email')} />
            <InfoBox
              value={
                personalInformation?.birthDate
                  ? format(
                      new Date(personalInformation.birthDate),
                      'dd/MM/yyyy',
                    )
                  : ''
              }
              label={t('inputs:label.birthDate')}
            />
            <InfoBox
              value={
                personalInformation?.pushNotification
                  ? t('common:boolean.enabled')
                  : t('common:boolean.disabled')
              }
              label={t('inputs:label.pushNotifications')}
            />
          </InfoContainer>
          <Divider />
          <ProfileSectionHeader
            title={t('screens:profileScreen.measurements')}
            onEditPress={() => {
              setShowModal(true);
            }}
          />
          <InfoContainer>
            <InfoBox
              value={growRecords?.[0]?.weight?.toString() || ''}
              label={t('inputs:label.weight')}
            />
            <InfoBox
              value={
                growRecords?.[0]?.height?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || ''
              }
              label={t('inputs:label.height')}
            />
          </InfoContainer>
          <Divider />
          <ProfileSectionHeader
            title={t('screens:profileScreen.trainingPreferences')}
            onEditPress={() => navigation.navigate('EditTrainingPreferences')}
          />
          <InfoContainer>
            <InfoBox
              value={t(`common:trainingType.${trainingPreference?.type}`)}
              label={t('inputs:label.trainingType')}
            />
            <InfoBox
              value={t(
                `common:trainingIntensity.${trainingPreference?.intensity}`,
              )}
              label={t('inputs:label.trainingIntensity')}
            />
          </InfoContainer>
        </SectionBox>
        <SharedModal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={t('screens:profileScreen.measures')}
          body={<ModalContent onClose={() => setShowModal(false)} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
