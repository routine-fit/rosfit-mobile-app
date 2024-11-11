/* eslint-disable react-hooks/exhaustive-deps */
import {
  Check,
  CircleEllipsis,
  PauseCircle,
  PlayCircle,
  Timer,
} from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheet from '@gorhom/bottom-sheet';

import { Button, ScreenContainer, Text } from 'src/app/components';
import { ButtonColorTheme } from 'src/app/components/buttons/button/types';
import useTimer from 'src/hooks/useTimer';
import { RoutineExercise } from 'src/interfaces/routine';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  markExerciseDone,
  setExerciseInProgress,
} from 'src/store/routine/routine.actions';

import { FlatlistContainer } from '../select-routine/styles';
import { ExerciseBottomSheetContent } from './components/exercise-bottom-sheet';
import {
  ButtonContainer,
  ExercisesContainer,
  MainRoutineBadge,
  StartBadge,
  StyledBottomSheet,
} from './styles';
import { ExerciseStatus, Props } from './types';

export const RoutineRunnerScreen: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isPaused, start, pause, formattedTime } = useTimer();
  const { activeRoutine } = useAppSelector(state => state.routine);
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(
    null,
  );

  const exercises = useMemo<RoutineExercise[]>(() => {
    return activeRoutine?.routine.exercises || [];
  }, [activeRoutine?.routine.exercises]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const statusMapping = useMemo<
    Record<ExerciseStatus, { themeColor: string; icon: React.JSX.Element }>
  >(
    () => ({
      done: {
        themeColor: 'primary',
        icon: <Check />,
      },
      inProgress: {
        themeColor: 'secondary',
        icon: <Timer />,
      },
      pending: {
        themeColor: 'neutral',
        icon: <CircleEllipsis />,
      },
    }),
    [],
  );

  const buttonProperties = useMemo(() => {
    const isRoutineCompleted = exercises.every(ex => ex.status === 'done');
    const isRoutinePending = exercises.every(ex => ex.status === 'pending');
    return {
      content: isRoutineCompleted
        ? t('screens:routineRunner.completeRoutine')
        : t('screens:routineRunner.completeExercise'),
      themeColor: isRoutineCompleted ? 'secondary' : 'primary',
      disabled: isRoutinePending,
    };
  }, [exercises, t]);

  useEffect(() => {
    if (exercises.length > 0 && !isPaused) {
      const currentExercise = exercises.find(ex => ex.id === currentExerciseId);
      if (!currentExercise || currentExercise.status !== 'inProgress') {
        const nextExercise = exercises.find(ex => ex.status === 'pending');

        if (nextExercise) {
          setCurrentExerciseId(nextExercise.id);
        }
      }
    }
  }, [isPaused, currentExerciseId, exercises]);

  useEffect(() => {
    if (currentExerciseId) {
      const updatedData = exercises.map(ex =>
        ex.id === currentExerciseId ? { ...ex, status: 'inProgress' } : ex,
      );
      dispatch(setExerciseInProgress(updatedData));
    }
  }, [currentExerciseId]);

  const markCurrentExerciseDone = () => {
    if (currentExerciseId !== null) {
      const updatedData = exercises.map(ex =>
        ex.id === currentExerciseId ? { ...ex, status: 'done' } : ex,
      );
      dispatch(markExerciseDone(updatedData));

      const nextExercise = updatedData.find(ex => ex.status === 'pending');
      if (nextExercise) {
        setCurrentExerciseId(nextExercise.id);
      } else {
        setCurrentExerciseId(null);
      }
    } else {
      // TODO: Completar toda la rutina
      // dispatch complete routine
      navigation.navigate('RoutineResults', { time: formattedTime });
    }
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <ScreenContainer>
      {formattedTime === '00:00:00' ? (
        <StartBadge onPress={start}>
          <Text color={theme.colors.background} fontSize="3xl">
            Comenzar rutina
          </Text>
          <Text color={theme.colors.background} fontSize="3xl">
            {activeRoutine?.routine.name}
          </Text>
        </StartBadge>
      ) : (
        <MainRoutineBadge>
          <Text>{t('screens:routineRunner.routineInProgress')}</Text>
          <Text fontSize="5xl">{formattedTime}</Text>
          <ButtonContainer>
            {isPaused ? (
              <Button
                content={t('screens:routineRunner.continue')}
                trailingIcon={<PlayCircle />}
                onPress={start}
              />
            ) : (
              <Button
                content={t('screens:routineRunner.pause')}
                trailingIcon={<PauseCircle />}
                themeColor="error"
                onPress={pause}
              />
            )}
          </ButtonContainer>
        </MainRoutineBadge>
      )}

      <ExercisesContainer>
        <FlatlistContainer
          data={activeRoutine?.routine.exercises}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const status = (item.status as ExerciseStatus) || 'pending';
            const { themeColor, icon } = statusMapping[status];

            return (
              <Button
                content={item.exercise.name}
                themeColor={(themeColor as ButtonColorTheme) || 'neutral'}
                trailingIcon={icon}
                disabled={status !== 'inProgress'}
                marginTop={8}
                onPress={openBottomSheet}
              />
            );
          }}
        />
      </ExercisesContainer>

      <Button
        content={buttonProperties.content}
        themeColor={buttonProperties.themeColor as ButtonColorTheme}
        onPress={markCurrentExerciseDone}
        disabled={buttonProperties.disabled}
      />

      <StyledBottomSheet
        index={-1}
        detached
        snapPoints={['70%']}
        enablePanDownToClose
        ref={bottomSheetRef}
      >
        {currentExerciseId !== null && (
          <ExerciseBottomSheetContent
            exercise={exercises.find(ex => ex.id === currentExerciseId)!}
          />
        )}
      </StyledBottomSheet>
    </ScreenContainer>
  );
};
