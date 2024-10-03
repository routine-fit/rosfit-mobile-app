import { PlusIcon } from 'lucide-react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ScreenContainer } from 'src/app/components';
import ExerciseList from 'src/app/widgets/exercises-list';
import { useAppDispatch } from 'src/store';
import { clearExercise } from 'src/store/exercise/exercise.actions';

import { BottomContainer } from './styles';
import { MyExercisesScreenProps } from './types';

export const MyExercisesScreen: FC<MyExercisesScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <ScreenContainer>
      <ExerciseList />
      <BottomContainer>
        <Button
          onPress={() => {
            dispatch(clearExercise());
            navigation.navigate('FormExerciseScreen');
          }}
          fullWidth={false}
          content={t('screens:exercises.newExercise')}
          trailingIcon={<PlusIcon />}
          themeColor="secondary"
        />
      </BottomContainer>
    </ScreenContainer>
  );
};
