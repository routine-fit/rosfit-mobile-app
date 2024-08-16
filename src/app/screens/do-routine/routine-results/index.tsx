import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ScreenContainer, Text } from 'src/app/components';
import { LottieAnimation } from 'src/app/components/lottie-animation';

import { Container } from './styles';
import { Props } from './types';

export const RoutineResultsScreen: FC<Props> = ({ route }) => {
  const { t } = useTranslation();
  const { time } = route.params;

  return (
    <ScreenContainer>
      <Container>
        <Text fontSize="3xl">{t('screens:routineResults.heading1')}</Text>

        <LottieAnimation
          source={require('src/assets/lottie/medal.json')}
          width={250}
          height={250}
        />
        <Text fontSize="2xl">{t('screens:routineResults.time')}</Text>
        <Text fontSize="4xl">{time}</Text>
      </Container>
      <Button
        content={t('screens:routineResults.loadStatistics')}
        onPress={() => {}}
      />
    </ScreenContainer>
  );
};
