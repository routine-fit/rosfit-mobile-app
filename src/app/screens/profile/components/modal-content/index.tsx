import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { Button, ControlledTextInput, GapContainer } from 'src/app/components';

import { formConfig, FormData } from './form-config';
import { ButtonContainer } from './styles';
import { ModalContentProps } from './types';

export const ModalContent: FC<ModalContentProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<FormData>(formConfig);

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      //TODO: dispatch thunks
      console.log(data);
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
