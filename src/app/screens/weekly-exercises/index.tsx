import { ArrowRightCircle } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { Heading, ScreenContainer, Text } from 'src/app/components';
import { AccordionItem } from 'src/app/components/accordion';
import { MainDrawerParamList } from 'src/app/navigation/types';
import { Exercise, MuscleGroup } from 'src/interfaces/exercises';
import weeklyExercisesDataFile from 'src/mocks/weekly-exercises-data.json';

import { ExerciseRow } from './styles';

interface Props
  extends DrawerScreenProps<MainDrawerParamList, 'WeeklyExercises'> {}

export const WeeklyExercisesScreen: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [weeklyExercisesData, setWeeklyExercisesData] = useState<
    Exercise[] | []
  >([]);

  const fetchWeeklyExercisesData = async (): Promise<Exercise[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(weeklyExercisesDataFile as Exercise[]);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeeklyExercisesData();
        setWeeklyExercisesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const groupAndTransformExercises = (weeklyExercises: Exercise[] | null) => {
    const groupedExercises: Record<MuscleGroup, Exercise[]> = {} as Record<
      MuscleGroup,
      Exercise[]
    >;

    weeklyExercises?.forEach(exercise => {
      const { muscleGroup } = exercise;
      if (groupedExercises[muscleGroup]) {
        groupedExercises[muscleGroup].push(exercise);
      } else {
        groupedExercises[muscleGroup] = [exercise];
      }
    });

    return Object.entries(groupedExercises).map(([muscleGroup, exercises]) => ({
      muscleGroup,
      exercises,
    }));
  };

  const muscleGroups = groupAndTransformExercises(weeklyExercisesData);

  if (!weeklyExercisesData) {
    return (
      <ScreenContainer withoutVerticalPadding>
        <Text>Loading...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Heading
        title={t(`screens:weeklyExercises.heading1`)}
        flexTitleAlign="center"
        type="h3"
      />
      <FlatList
        data={muscleGroups}
        keyExtractor={item => item.muscleGroup}
        renderItem={({ item }) => (
          <AccordionItem
            title={t(`common:muscleGroups.${item.muscleGroup}`)}
            count={item.exercises.length}
            body={
              <>
                {item.exercises.map(exercise => (
                  <ExerciseRow key={exercise.id}>
                    <Text fontSize="sm" textAlign="center">
                      {exercise.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('WeeklyExerciseStatistics', {
                          exerciseName: exercise.name,
                        })
                      }
                    >
                      <ArrowRightCircle
                        color={theme.colors.secondary.default}
                      />
                    </TouchableOpacity>
                  </ExerciseRow>
                ))}
              </>
            }
          />
        )}
      />
    </ScreenContainer>
  );
};
