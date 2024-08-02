import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal } from 'react-native';

import TextInput from 'src/app/components/inputs/text-input';
import Text from 'src/app/components/text';

import { BottomSheetContent, Option, Overlay } from './styles';
import { SelectInputProps } from './types';

const ControlledSelectInput = <Form extends FieldValues>({
  controller,
  options,
  ...restOfProps
}: SelectInputProps<Form>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController(controller);
  const { t } = useTranslation();

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setModalVisible(false);
  };

  return (
    <>
      <TextInput
        error={error?.message}
        label={label}
        placeholder={placeholder}
        {...restOfProps}
        onBlur={onBlur}
        value={value}
        readOnly
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Overlay>
          <BottomSheetContent>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <Option onPress={() => handleSelect(item)}>
                  <Text fontSize="lg">{item}</Text>
                </Option>
              )}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
            />
          </BottomSheetContent>
        </Overlay>
      </Modal>
    </>
  );
};

export default ControlledSelectInput;
