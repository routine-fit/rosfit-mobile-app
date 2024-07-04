import React, { FC } from 'react';

import { Text } from 'src/app/components';
import { EditIcon } from 'src/assets/svg/navigation-icons/edit-icon';

import { Container, EditButton, TitleContainer } from './styles';
import { ProfileSectionProps } from './types';

export const ProfileSectionHeader: FC<ProfileSectionProps> = ({
  title,
  onEditPress,
}) => (
  <Container>
    <TitleContainer>
      <Text textAlign="center">{title}</Text>
    </TitleContainer>

    <EditButton onPress={onEditPress}>
      <EditIcon />
    </EditButton>
  </Container>
);
