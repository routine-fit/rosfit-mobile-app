import React, { FC, useState } from 'react';
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
import mockedExercises from 'src/mocks/weekly-exercises-data.json';

import { RoutineFormData } from '../form-config';
import { ExerciseItem } from './components/exercise-item';
import { CenteredView } from './styles';
import { ExerciseRevisionProps } from './types';

export const ExercisesRevisionScreen: FC<ExerciseRevisionProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { control, handleSubmit } = useFormContext<RoutineFormData>();

  const onValidSubmit: SubmitHandler<RoutineFormData> = async _data => {
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
        data={mockedExercises as Exercise[]}
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
