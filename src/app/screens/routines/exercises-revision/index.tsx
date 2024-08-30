import React, { FC, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import {
  Button,
  Heading,
  ScreenContainer,
  SharedModal,
} from 'src/app/components';
import { RoutinesParamList } from 'src/app/navigation/types';
import mockedExercises from 'src/mocks/weekly-exercises-data.json';

import { FormData } from '../form-config';
import { ExerciseItem } from './components/exercise-item';

interface Props
  extends StackScreenProps<RoutinesParamList, 'ExercisesRevision'> {}

export const ExercisesRevision: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { control, handleSubmit } = useFormContext<FormData>();

  const onValidSubmit: SubmitHandler<FormData> = async _data => {
    try {
      // TODO: dispatch thunks
      setShowModal(true);
    } catch (error: any) {
      Alert.alert(t('screens:addRoutine:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Heading
        title={t('screens:exercisesRevision.heading')}
        type="h3"
        flexTitleAlign="center"
      />
      <FlatList
        data={mockedExercises}
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
          <>
            {/* TODO: ADD LOTTIE? */}
            <Button
              variant="outlined"
              content={t('common:button.confirm')}
              onPress={() => {
                navigation.navigate('RoutineDashboard');
              }}
            />
          </>
        }
      />
    </ScreenContainer>
  );
};
