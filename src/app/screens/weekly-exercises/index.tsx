import { ArrowRightCircle } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

// import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Heading, ScreenContainer, Text } from 'src/app/components';
import { AccordionItem } from 'src/app/components/accordion';
// import { MainDrawerParamList } from 'src/app/navigation/types';
import { Exercise, MuscleGroup } from 'src/interfaces/exercises';
import weeklyExercisesDataFile from 'src/mocks/weekly-exercises-data.json';

export const WeeklyExercisesScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  // const navigation = useNavigation<NavigationProp<MainDrawerParamList>>();
  const [weeklyExercisesData, setWeeklyExercisesData] = useState<
    Exercise[] | null
  >(null);

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
        console.error('Error fetching dashboard data:', error);
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
        title="Ejercicios de la semana"
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
                  <View key={exercise.id} style={styles.exerciseRow}>
                    <Text fontSize="sm" textAlign="center">
                      {exercise.name}
                    </Text>
                    <TouchableOpacity>
                      <ArrowRightCircle
                        color={theme.colors.secondary.default}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            }
          />
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  exerciseRow: {
    flexDirection: 'row',
    margin: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
