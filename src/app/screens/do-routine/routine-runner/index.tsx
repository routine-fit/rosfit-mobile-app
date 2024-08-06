import {
  Check,
  CircleEllipsis,
  PauseCircle,
  PlayCircle,
  Timer,
} from 'lucide-react-native';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, ScreenContainer, Text } from 'src/app/components';
import { ButtonColorTheme } from 'src/app/components/buttons/button/types';
import { DoRoutineStackParamList } from 'src/app/navigation/types';
import useTimer from 'src/hooks/useTimer';
import { RoutineExercise } from 'src/interfaces/routine-exercises';
import routineExercisesDataFile from 'src/mocks/routine-exercises.json';

import { ExerciseBottomSheetContent } from './components/exercise-bottom-sheet';

interface Props
  extends StackScreenProps<DoRoutineStackParamList, 'RoutineRunner'> {}

export const RoutineRunnerScreen: FC<Props> = () => {
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
      content: isRoutineCompleted ? 'Completar rutina' : 'Completar ejercicio',
      themeColor: isRoutineCompleted ? 'secondary' : 'primary',
      disabled: isRoutinePending,
    };
  }, [routineExercisesData]);

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
        console.error('Error fetching dashboard data:', error);
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
    }
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <ScreenContainer>
      <View style={styles.mainRoutineBadge}>
        <Text>Rutina en curso</Text>
        <Text fontSize="5xl">{formattedTime}</Text>
        <View style={styles.buttonContainer}>
          {isPaused ? (
            <Button
              content="Continuar"
              trailingIcon={<PlayCircle />}
              onPress={start}
            />
          ) : (
            <Button
              content="Pausar"
              trailingIcon={<PauseCircle />}
              themeColor="error"
              onPress={pause}
            />
          )}
        </View>
      </View>
      <View style={styles.exercisesContainer}>
        <FlatList
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
          style={styles.flatList}
        />
      </View>

      <Button
        content={buttonProperties.content}
        themeColor={buttonProperties.themeColor as ButtonColorTheme}
        onPress={markCurrentExerciseDone}
        disabled={buttonProperties.disabled}
      />

      <BottomSheet
        index={-1}
        detached
        snapPoints={['70%']}
        enablePanDownToClose
        ref={bottomSheetRef}
        backgroundStyle={styles.bottomSheet}
      >
        {currentExerciseId !== null &&
          routineExercisesData[currentExerciseId] && (
            <ExerciseBottomSheetContent
              exercise={
                routineExercisesData.find(ex => ex.id === currentExerciseId)!
              }
            />
          )}
      </BottomSheet>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  mainRoutineBadge: {
    // backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    // borderColor: 'lightgreen',
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 5,
  },
  exercisesContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  flatList: {
    flex: 1,
  },
  bottomSheet: { borderWidth: 2 },
});
