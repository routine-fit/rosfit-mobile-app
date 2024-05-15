import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, TouchableOpacity } from 'react-native';

import TextInput from 'src/app/components/inputs/text-input';
import Text from 'src/app/components/text';

import { ModalContent, Option, Overlay } from './styles';
import { SelectInputProps } from './types';

const ControlledSelectInput = <Form extends FieldValues>({
  controller,
  options,
  ...restOfProps
}: SelectInputProps<Form>) => {
  const {
    field: { onChange, onBlur },
    fieldState: { error },
  } = useController(controller);
  const { t } = useTranslation();

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleSelect = (selectedValue: string, valueLabel: string) => {
    onChange(selectedValue);
    setSelectedLabel(valueLabel);
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
        value={selectedLabel}
        readOnly
        onChangeText={(val: string) =>
          onChange(val.length === 1 ? val.trim() : val)
        }
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Overlay>
          <ModalContent>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value, item.label)}
                >
                  <Option>
                    <Text fontSize="lg">{item.label}</Text>
                  </Option>
                </TouchableOpacity>
              )}
              keyExtractor={(item, i) => i.toString()}
            />
          </ModalContent>
        </Overlay>
      </Modal>
    </>
  );
};

export default ControlledSelectInput;
