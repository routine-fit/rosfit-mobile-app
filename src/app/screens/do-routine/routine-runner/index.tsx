import {
  Check,
  CircleEllipsis,
  PauseCircle,
  PlayCircle,
  Timer,
} from 'lucide-react-native';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, ScreenContainer, Text } from 'src/app/components';
import { DoRoutineStackParamList } from 'src/app/navigation/types';
import { RoutineExercises } from 'src/interfaces/routine-exercises';
import routineExercisesDataFile from 'src/mocks/routine-exercises.json';

interface Props
  extends StackScreenProps<DoRoutineStackParamList, 'RoutineRunner'> {}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
};

const getInitialExerciseStatus = (exercises: RoutineExercises[]) => {
  return exercises.reduce((status, exercise) => {
    status[exercise.id] = 'pending';
    return status;
  }, {} as Record<number, 'done' | 'inProgress' | 'pending'>);
};

export const RoutineRunnerScreen: FC<Props> = () => {
  const [routineTimer, setRoutineTimer] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [routineExercisesData, setRoutineExercisesData] = useState<
    RoutineExercises[] | []
  >([]);
  const [exerciseStatus, setExerciseStatus] = useState<
    Record<number, 'done' | 'inProgress' | 'pending'>
  >({});
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(
    null,
  );

  const fetchRoutineExercisesData = (): Promise<RoutineExercises[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(routineExercisesDataFile as RoutineExercises[]);
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
        setExerciseStatus(getInitialExerciseStatus(data));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isPaused) {
      interval = setInterval(() => {
        setRoutineTimer(prevTime => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    if (routineExercisesData.length > 0 && !isPaused) {
      const currentExercise = routineExercisesData.find(
        ex => ex.id === currentExerciseId,
      );
      if (
        !currentExercise ||
        exerciseStatus[currentExercise.id] !== 'inProgress'
      ) {
        const nextExercise = routineExercisesData.find(
          ex => exerciseStatus[ex.id] === 'pending',
        );

        if (nextExercise) {
          setCurrentExerciseId(nextExercise.id);
          setExerciseStatus(prevStatus => ({
            ...prevStatus,
            [nextExercise.id]: 'inProgress',
          }));
        }
      }
    }
  }, [isPaused, routineExercisesData, exerciseStatus, currentExerciseId]);

  const markCurrentExerciseDone = () => {
    if (currentExerciseId !== null) {
      setExerciseStatus(prevStatus => ({
        ...prevStatus,
        [currentExerciseId]: 'done',
      }));
      const nextExercise = routineExercisesData.find(
        ex => exerciseStatus[ex.id] === 'pending',
      );
      if (nextExercise) {
        setCurrentExerciseId(nextExercise.id);
        setExerciseStatus(prevStatus => ({
          ...prevStatus,
          [nextExercise.id]: 'inProgress',
        }));
      }
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.mainRoutineBadge}>
        <Text>Rutina en curso</Text>
        <Text fontSize="5xl">{formatTime(routineTimer)}</Text>
        <View style={styles.buttonContainer}>
          {isPaused ? (
            <Button
              content="Continuar"
              trailingIcon={<PlayCircle />}
              onPress={() => setIsPaused(!isPaused)}
            />
          ) : (
            <Button
              content="Pausar"
              trailingIcon={<PauseCircle />}
              themeColor="error"
              onPress={() => setIsPaused(!isPaused)}
            />
          )}
        </View>
      </View>
      <View style={styles.exercisesContainer}>
        <FlatList
          data={routineExercisesData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Button
              content={item.exercise}
              themeColor={
                exerciseStatus[item.id] === 'done'
                  ? 'primary'
                  : exerciseStatus[item.id] === 'inProgress'
                  ? 'secondary'
                  : 'neutral'
              }
              trailingIcon={
                exerciseStatus[item.id] === 'done' ? (
                  <Check />
                ) : exerciseStatus[item.id] === 'inProgress' ? (
                  <Timer />
                ) : (
                  <CircleEllipsis />
                )
              }
              marginTop={8}
              onPress={() => {}}
            />
          )}
          style={styles.flatList}
        />
      </View>
      <Button
        content="Completar ejercicio"
        themeColor="primary"
        onPress={markCurrentExerciseDone}
      />
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
});
