import { SearchIcon } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList } from 'react-native';

import { Text, TextInput } from 'src/app/components';
import { Exercise } from 'src/interfaces/exercises';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getExercises } from 'src/store/exercise/exercise.thunks';

import ExerciseItem from './components/exercise-item';
import { SearchWrapper, styles } from './styles';
import { SelectExerciseListProps } from './types';

const SelectExerciseList: FC<SelectExerciseListProps> = ({
  appendExercise,
  removeExercise,
  fields,
}) => {
  const [searchByName, setSearchByName] = useState('');
  const theme = useTheme();
  const { t } = useTranslation();

  // TODO: Handle error case
  const { exerciseList, status } = useAppSelector(state => state.exercise);
  const isLoading = status === 'loading';
  const dispatch = useAppDispatch();

  const fetchGetExercises = useCallback(() => {
    if (searchByName.length > 2 || searchByName.length === 0) {
      dispatch(getExercises({ name: searchByName }));
    }
  }, [dispatch, searchByName]);

  useEffect(() => {
    fetchGetExercises();
  }, [fetchGetExercises]);

  const handleSelectExercise = (exercise: Exercise, isChecked: boolean) => {
    const exerciseIndex = fields.findIndex(
      field => field.exerciseId === exercise.id,
    );
    if (isChecked) {
      if (exerciseIndex === -1) {
        appendExercise({
          exerciseId: exercise.id,
          repetitions: '0',
          order: fields.length + 1,
          restTimeSecs: '0',
          series: [{ order: 1, weight: '0', weightMeasure: 'kg' }],
        });
      }
    } else {
      if (exerciseIndex !== -1) {
        removeExercise(exerciseIndex);
      }
    }
  };

  return (
    <>
      <SearchWrapper>
        <TextInput
          onChangeText={setSearchByName}
          value={searchByName}
          trailingIcon={
            isLoading ? (
              <ActivityIndicator
                color={theme.colors.primary.default}
                size={16}
              />
            ) : (
              <SearchIcon
                color={theme.colors.stroke.default}
                fillOpacity={0}
                height={16}
                width={16}
              />
            )
          }
          placeholder={t('inputs:placeholder.searchOnList')}
          variant="rounded"
        />
      </SearchWrapper>
      <FlatList<Exercise>
        data={exerciseList}
        renderItem={({ item }) => (
          <ExerciseItem
            item={item}
            handleExercisePress={(isChecked: boolean) =>
              handleSelectExercise(item, isChecked)
            }
          />
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          status !== 'loading' ? (
            <Text>{t('screens:exercises.emptyExerciseList')}</Text>
          ) : (
            <></>
          )
        }
        onRefresh={fetchGetExercises}
        refreshing={isLoading && exerciseList.length > 0}
        style={styles.flatListContainer}
      />
    </>
  );
};

export default SelectExerciseList;
