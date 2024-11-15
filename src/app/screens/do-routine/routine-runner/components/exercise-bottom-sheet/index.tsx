import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { Button, Text } from 'src/app/components';
import { LottieAnimation } from 'src/app/components/lottie-animation';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  markExerciseDone,
  markSerieDone,
  markSerieInProgress,
} from 'src/store/routine/routine.actions';

import { StepIndicator } from '../step-indicator';
import { StyledBottomSheetView } from './styles';
import { Props } from './types';

export const ExerciseBottomSheetContent: FC<Props> = ({ exercise }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentExercise } = useAppSelector(state => state.routine);
  const series = currentExercise?.series || [];
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isSeriesComplete, setIsSeriesComplete] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(
    series.findIndex(serie => serie.status === 'inProgress') !== -1
      ? series.findIndex(serie => serie.status === 'inProgress')
      : 0,
  );

  const handleFinishSeries = () => {
    if (currentStepIndex >= 0 && currentStepIndex < series.length - 1) {
      const updatedSeries = series.map((step, index) => ({
        ...step,
        status: index === currentStepIndex ? 'done' : step.status,
      }));

      const exerciseId = currentExercise?.id || '';
      const seriesIndex = currentStepIndex;

      dispatch(markSerieDone({ exerciseId, seriesIndex }));

      updatedSeries[currentStepIndex + 1].status = 'inProgress';

      dispatch(
        markSerieInProgress({
          exerciseId,
          seriesIndex: currentStepIndex + 1,
        }),
      );

      setCurrentStepIndex(prevIndex => prevIndex + 1);
      setIsResting(true);
      setIsSeriesComplete(true);
    } else {
      dispatch(markExerciseDone(exercise.id));
    }
  };

  const handleStartSeries = () => {
    setIsSeriesComplete(false);
    setIsResting(false);
  };

  return (
    <StyledBottomSheetView>
      <Text fontSize="lg">{exercise?.exercise.name}</Text>
      {isResting ? (
        <CountdownCircleTimer
          size={100}
          strokeWidth={7}
          isPlaying={isResting}
          duration={exercise.restTimeSecs}
          isSmoothColorTransition
          colors={['#004777', '#2ecc71', '#F7B801', '#A30000']}
          colorsTime={[10, 7, 4, 0]}
        >
          {({ remainingTime }) => <Text fontSize="4xl">{remainingTime}</Text>}
        </CountdownCircleTimer>
      ) : (
        <LottieAnimation source={require('src/assets/lottie/barbell.json')} />
      )}

      <StepIndicator steps={series} />

      {isSeriesComplete ? (
        <Button
          content={t('screens:routineRunner.startSeries')}
          onPress={handleStartSeries}
          marginTop={8}
          themeColor="primary"
        />
      ) : exercise?.status !== 'done' ? (
        <Button
          content={
            currentStepIndex < series.length - 1
              ? t('screens:routineRunner.finishSeries')
              : t('screens:routineRunner.completeExercise')
          }
          onPress={handleFinishSeries}
          marginTop={8}
          themeColor="secondary"
        />
      ) : (
        <Button
          content="Completar rutina"
          // TODO : DISPATCH COMPLETE ROUTINE
          onPress={() => {}}
          marginTop={8}
          themeColor="secondary"
        />
      )}
    </StyledBottomSheetView>
  );
};
