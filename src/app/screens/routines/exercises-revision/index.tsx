import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList } from 'react-native';

import {
  Button,
  Heading,
  ScreenContainer,
  SharedModal,
} from 'src/app/components';
import { LottieAnimation } from 'src/app/components/lottie-animation';
import { Exercise } from 'src/interfaces/exercises';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getExercises } from 'src/store/exercise/exercise.thunks';

import { RoutineFormData } from '../form-config';
import { ExerciseItem } from './components/exercise-item';
import { CenteredView } from './styles';
import { ExerciseRevisionProps } from './types';

export const ExercisesRevisionScreen: FC<ExerciseRevisionProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { exerciseList } = useAppSelector(state => state.exercise);

  const { control, handleSubmit, watch, reset } =
    useFormContext<RoutineFormData>();

  const exercisesForm = watch('exercises');

  const filteredExercises = exerciseList.filter(exercise =>
    exercisesForm.some(formExercise => formExercise.exerciseId === exercise.id),
  );

  const onValidSubmit: SubmitHandler<RoutineFormData> = async _data => {
    try {
      // TODO: dispatch thunks
      setShowModal(true);
      reset();
    } catch (error: any) {
      Alert.alert(t('screens:addRoutine:error'), error.message);
    }
  };

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  return (
    <ScreenContainer>
      <Heading
        title={t('screens:exercisesRevision.heading')}
        type="h3"
        flexTitleAlign="center"
      />
      <FlatList
        data={filteredExercises as Exercise[]}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item} control={control} index={index} />
        )}
        keyExtractor={item => item.name.toString()}
        showsVerticalScrollIndicator={false}
      />
      <Button
        onPress={handleSubmit(onValidSubmit)}
        content={t('screens:exercisesRevision.createRoutine')}
        themeColor="secondary"
        marginTop={10}
      />
      <SharedModal
        open={showModal}
        onClose={() => {}}
        title={t('screens:exercisesRevision.successMessage')}
        body={
          <CenteredView>
            <LottieAnimation
              source={require('src/assets/lottie/success.json')}
              width={200}
              height={200}
              loop={false}
            />
            <Button
              variant="outlined"
              content={t('common:button.confirm')}
              onPress={() => {
                navigation.navigate('RoutineDashboard');
              }}
            />
          </CenteredView>
        }
      />
    </ScreenContainer>
  );
};
