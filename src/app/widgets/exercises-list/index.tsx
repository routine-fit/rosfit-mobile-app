import { SearchIcon } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { Text, TextInput } from 'src/app/components';
import { Exercise } from 'src/interfaces/exercises';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getExercises } from 'src/store/exercise/exercise.thunks';

import ExerciseItem from './components/exercise-item';
import { SearchWrapper, styles } from './styles';

const ExerciseList = () => {
  const [searchByName, setSearchByName] = useState('');
  const theme = useTheme();
  const { t } = useTranslation();

  // TODO: Handle error case
  const { exerciseList, status } = useAppSelector(state => state.exercise);
  const isLoading = status === 'loading';
  const dispatch = useAppDispatch();

  const fetchGetExercises = useCallback(() => {
    dispatch(getExercises(searchByName));
  }, [dispatch, searchByName]);

  useEffect(() => {
    fetchGetExercises();
  }, [fetchGetExercises]);

  const filtered = useMemo(
    () =>
      exerciseList.filter(exercise =>
        exercise.name.toLowerCase().includes(searchByName.toLowerCase()),
      ),
    [exerciseList, searchByName],
  );

  return (
    <>
      <SearchWrapper>
        <TextInput
          onChangeText={setSearchByName}
          value={searchByName}
          trailingIcon={
            <SearchIcon
              color={theme.colors.stroke.default}
              fillOpacity={0}
              height={16}
              width={16}
            />
          }
          placeholder={t('inputs:placeholder.searchOnList')}
          variant="rounded"
        />
      </SearchWrapper>
      <FlatList<Exercise>
        data={filtered}
        renderItem={({ item }) => <ExerciseItem item={item} />}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          exerciseList.length === 0 && status !== 'idle' ? (
            <Text>{t('screens:exercises.emptyExerciseList')}</Text>
          ) : (
            <></>
          )
        }
        onRefresh={fetchGetExercises}
        refreshing={isLoading}
        style={styles.flatListContainer}
      />
    </>
  );
};

export default ExerciseList;
