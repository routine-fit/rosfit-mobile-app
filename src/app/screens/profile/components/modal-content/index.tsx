import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, ControlledTextInput, GapContainer } from 'src/app/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { createGrowRecord } from 'src/store/profile/profile.thunks';

import { FormData, validationSchema } from './form-config';
import { ButtonContainer } from './styles';
import { ModalContentProps } from './types';

export const ModalContent: FC<ModalContentProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const growRecords = useAppSelector(state => state.profile.growRecords);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      weight: growRecords[0]?.weight?.toString(),
      height: growRecords[0]?.height?.toString(),
    },
    resolver: yupResolver(validationSchema),
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const parsedData = {
        weight: parseFloat(data.weight),
        height: parseFloat(data.height),
      };
      await dispatch(createGrowRecord(parsedData));
      onClose();
    } catch (error: any) {
      Alert.alert(t('screens:editTrainingPreferences:error'), error.message);
    }
  };

  return (
    <GapContainer space={4}>
      <ControlledTextInput
        controller={{
          control,
          name: 'weight',
        }}
      />
      <ControlledTextInput
        controller={{
          control,
          name: 'height',
        }}
      />
      <ButtonContainer>
        <Button
          content={t('common:button.confirm')}
          onPress={handleSubmit(onValidSubmit)}
          variant="filled"
          themeColor="primary"
          size="m"
        />
        <Button
          content={t('common:button.cancel')}
          onPress={onClose}
          variant="filled"
          themeColor="error"
          size="m"
        />
      </ButtonContainer>
    </GapContainer>
  );
};
