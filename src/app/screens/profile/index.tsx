import { useTheme } from 'styled-components/';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Divider, SharedModal, Text } from 'src/app/components';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import { ProfileData } from 'src/interfaces/profile-data';
import profileDataFile from 'src/mocks/profile-data.json';
import { useAppSelector } from 'src/store';
import { commonStyles } from 'src/utils/styles';

import { InfoBox } from './components/info-box';
import { ModalContent } from './components/modal-content';
import { ProfileSectionHeader } from './components/profile-section-header';
import { HeaderBox, InfoContainer, SectionBox } from './styles';
import { ProfileScreenProps } from './types';

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();

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
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [profileData]);

  const { displayName } = useAppSelector(state => state.auth);
  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <ScrollView>
        <HeaderBox>
          <UserAvatar
            width={70}
            height={70}
            color={theme.colors.feedback.info.default}
          />
          <Text>{displayName}</Text>
        </HeaderBox>
        <SectionBox>
          <ProfileSectionHeader
            title="Informacion de perfil"
            onEditPress={() => navigation.navigate('EditPersonalInfo')}
          />
          <InfoContainer>
            <InfoBox value={profileData?.name} label="Nombre" />
            <InfoBox value={profileData?.lastName} label="Apellido" />
            <InfoBox value={profileData?.gender} label="Genero" />
            <InfoBox value={profileData?.email} label="Email" />
            <InfoBox
              value={profileData?.birthDate}
              label="Fecha de nacimiento"
            />
          </InfoContainer>
          <Divider />
          <ProfileSectionHeader
            title="Medidas corporales"
            onEditPress={() => {
              setShowModal(true);
            }}
          />
          <InfoContainer>
            <InfoBox value={profileData?.weight} label="Peso" />
            <InfoBox value={profileData?.height} label="Estatura" />
          </InfoContainer>
          <Divider />
          <ProfileSectionHeader
            title="Preferencias de entrenamiento"
            onEditPress={() => navigation.navigate('EditTrainingPreferences')}
          />
          <InfoContainer>
            <InfoBox
              value={profileData?.trainingType}
              label="Tipo de entrenamiento"
            />
            <InfoBox
              value={profileData?.trainingTime}
              label="Tiempo de entrenamiento"
            />
            <InfoBox
              value={profileData?.trainingIntensity}
              label="Intensidad de entrenamiento"
            />
            <InfoBox
              value={profileData?.trainingGoals}
              label="Objetivos de entrenamiento"
            />
          </InfoContainer>
        </SectionBox>
        <SharedModal
          open={showModal}
          onClose={() => setShowModal(false)}
          title="Medidas corporales"
          body={<ModalContent onClose={() => setShowModal(false)} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
