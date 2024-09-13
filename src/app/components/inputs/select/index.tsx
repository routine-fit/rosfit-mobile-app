import React, { useEffect, useState } from 'react';
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
  editable = true,
  ...restOfProps
}: SelectInputProps<Form>) => {
  const [selectedLabel, setSelectedLabel] = useState('');
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController(controller);
  const { t } = useTranslation();

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
    }
  }, [value, options]);

  const handleSelect = (selectedValue: string, selectedLabe: string) => {
    onChange(selectedValue);
    setSelectedLabel(selectedLabe);
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
        editable={editable}
        readOnly={!editable}
        onChangeText={(val: string) =>
          editable ? onChange(val.length === 1 ? val.trim() : val) : null
        }
        onPress={() => editable && setModalVisible(true)} // Open modal only if editable
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
                <Option onPress={() => handleSelect(item.value, item.label)}>
                  <Text fontSize="lg">{item.label}</Text>
                </Option>
              )}
              keyExtractor={item => item.value.toString()}
              showsVerticalScrollIndicator={false}
            />
          </BottomSheetContent>
        </Overlay>
      </Modal>
    </>
  );
};

export default ControlledSelectInput;
