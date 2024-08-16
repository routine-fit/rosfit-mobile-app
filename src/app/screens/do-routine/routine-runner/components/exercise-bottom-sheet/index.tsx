import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { Button, Text } from 'src/app/components';

import { StepIndicator } from '../step-indicator';
import { StepData } from '../step-indicator/types';
import {
  LottieContainer,
  StyledBottomSheetView,
  StyledLottieView,
} from './styles';
import { Props } from './types';

const initialSteps: StepData[] = [
  {
    id: '1',
    title: 'Serie 1',
    description: 'Peso: 50 Kg',
    status: 'inProgress',
  },
  {
    id: '2',
    title: 'Serie 2',
    description: 'Peso: 60 Kg',
    status: 'pending',
  },
  { id: '3', title: 'Serie 3', description: 'Peso: 70 Kg', status: 'pending' },
  { id: '4', title: 'Serie 4', description: 'Peso: 70 Kg', status: 'pending' },
  { id: '5', title: 'Serie 5', description: 'Peso: 70 Kg', status: 'pending' },
  { id: '6', title: 'Serie 6', description: 'Peso: 70 Kg', status: 'pending' },
];

export const ExerciseBottomSheetContent: FC<Props> = ({ exercise }) => {
  const { t } = useTranslation();
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isSeriesComplete, setIsSeriesComplete] = useState(false);
  const [steps, setSteps] = useState<StepData[]>(initialSteps);

  const currentStepIndex = steps.findIndex(
    step => step.status === 'inProgress',
  );

  const handleFinishSeries = () => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length - 1) {
      const updatedSteps = [...steps];
      updatedSteps[currentStepIndex].status = 'done';
      updatedSteps[currentStepIndex + 1].status = 'inProgress';
      setSteps(updatedSteps);
      setIsResting(true);
      setIsSeriesComplete(true);
    } else {
      //TODO: dispatch completar ejercicio
    }
  };

  const handleStartSeries = () => {
    setIsSeriesComplete(false);
    setIsResting(false);
  };

  return (
    <StyledBottomSheetView>
      <Text fontSize="lg">{exercise.exercise}</Text>
      {isResting ? (
        <CountdownCircleTimer
          size={100}
          strokeWidth={7}
          isPlaying={isResting}
          duration={exercise.restTime}
          isSmoothColorTransition
          colors={['#004777', '#2ecc71', '#F7B801', '#A30000']}
          colorsTime={[10, 7, 4, 0]}
        >
          {({ remainingTime }) => <Text fontSize="4xl">{remainingTime}</Text>}
        </CountdownCircleTimer>
      ) : (
        <LottieContainer>
          <StyledLottieView
            source={require('src/assets/lottie/barbell.json')}
            autoPlay
            loop
          />
        </LottieContainer>
      )}

      <StepIndicator steps={steps} />

      {isSeriesComplete ? (
        <Button
          content={t('screens:routineRunner.startSeries')}
          onPress={handleStartSeries}
          marginTop={8}
          themeColor="primary"
        />
      ) : (
        <Button
          content={
            currentStepIndex < steps.length - 1
              ? t('screens:routineRunner.finishSeries')
              : t('screens:routineRunner.completeExercise')
          }
          onPress={handleFinishSeries}
          marginTop={8}
          themeColor="secondary"
        />
      )}
    </StyledBottomSheetView>
  );
};
