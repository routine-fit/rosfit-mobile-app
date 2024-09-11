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
import { RoutineExercise } from 'src/interfaces/routine-exercises';
import routineExercisesDataFile from 'src/mocks/do-routine-exercises.json';

import { FlatlistContainer } from '../select-routine/styles';
import { ExerciseBottomSheetContent } from './components/exercise-bottom-sheet';
import {
  ButtonContainer,
  ExercisesContainer,
  MainRoutineBadge,
  StartBadge,
  StyledBottomSheet,
} from './styles';
import { Props } from './types';

export const RoutineRunnerScreen: FC<Props> = ({ route, navigation }) => {
  const { routine } = route.params;
  const { t } = useTranslation();
  const theme = useTheme();
  const { isPaused, start, pause, formattedTime } = useTimer();
  const [routineExercisesData, setRoutineExercisesData] = useState<
    RoutineExercise[] | []
  >([]);
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(
    null,
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  const statusMapping = useMemo(
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
    const isRoutineCompleted = routineExercisesData.every(
      ex => ex.status === 'done',
    );
    const isRoutinePending = routineExercisesData.every(
      ex => ex.status === 'pending',
    );
    return {
      content: isRoutineCompleted
        ? t('screens:routineRunner.completeRoutine')
        : t('screens:routineRunner.completeExercise'),
      themeColor: isRoutineCompleted ? 'secondary' : 'primary',
      disabled: isRoutinePending,
    };
  }, [routineExercisesData, t]);

  const fetchRoutineExercisesData = (): Promise<RoutineExercise[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(routineExercisesDataFile as RoutineExercise[]);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoutineExercisesData();
        setRoutineExercisesData(data);
      } catch (error) {
        console.error('Error fetching routine data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (routineExercisesData.length > 0 && !isPaused) {
      const currentExercise = routineExercisesData.find(
        ex => ex.id === currentExerciseId,
      );
      if (!currentExercise || currentExercise.status !== 'inProgress') {
        const nextExercise = routineExercisesData.find(
          ex => ex.status === 'pending',
        );

        if (nextExercise) {
          setCurrentExerciseId(nextExercise.id);
        }
      }
    }
  }, [isPaused, routineExercisesData, currentExerciseId]);

  useEffect(() => {
    if (currentExerciseId) {
      const updatedData = routineExercisesData.map(ex =>
        ex.id === currentExerciseId ? { ...ex, status: 'inProgress' } : ex,
      );
      setRoutineExercisesData(updatedData as RoutineExercise[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExerciseId]);

  const markCurrentExerciseDone = () => {
    if (currentExerciseId !== null) {
      const updatedData = routineExercisesData.map(ex =>
        ex.id === currentExerciseId ? { ...ex, status: 'done' } : ex,
      );
      setRoutineExercisesData(updatedData as RoutineExercise[]);

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
            {routine}
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
          data={routineExercisesData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const status = item.status;
            const { themeColor, icon } = statusMapping[status];

            return (
              <Button
                content={item.exercise}
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
        {currentExerciseId !== null &&
          routineExercisesData[currentExerciseId] && (
            <ExerciseBottomSheetContent
              exercise={
                routineExercisesData.find(ex => ex.id === currentExerciseId)!
              }
            />
          )}
      </StyledBottomSheet>
    </ScreenContainer>
  );
};
