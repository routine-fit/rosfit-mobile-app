import { SearchIcon } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';

import { TextInput } from 'src/app/components';
import { Exercise } from 'src/interfaces/exercises';

import ExerciseItem from './components/exercise-item';
import { SearchWrapper, styles } from './styles';

const exercises: Exercise[] = [
  {
    id: 1,
    name: 'Abdominales',
    muscleGroup: 'ABDOMINAL',
    userInfoId: '1',
  },
  {
    id: 2,
    name: 'Triceps',
    muscleGroup: 'TRICEPS',
    userInfoId: '1',
  },
  {
    id: 3,
    name: 'Sentadillas',
    muscleGroup: 'LATISSIMUS_DORSI',
    userInfoId: '1',
  },
];

const ExerciseList = () => {
  const [searchByName, setSearchByName] = useState('');
  const theme = useTheme();

  const filtered = useMemo(
    () =>
      exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchByName.toLowerCase()),
      ),
    [searchByName],
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
          placeholder="Buscar en la lista"
          variant="rounded"
        />
      </SearchWrapper>
      <FlatList<Exercise>
        data={filtered}
        renderItem={({ item }) => <ExerciseItem item={item} />}
        contentContainerStyle={styles.flatListContent}
      />
    </>
  );
};

export default ExerciseList;
