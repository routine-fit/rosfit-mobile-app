import React, { useCallback, useEffect, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Pressable } from 'react-native';

import TextInput from 'src/app/components/inputs/text-input';
import Text from 'src/app/components/text';

import { BottomSheetContent, Overlay, PressableOption } from './styles';
import { Option, SelectInputProps } from './types';

const ControlledSelectInput = <Form extends FieldValues>({
  controller,
  options,
  editable = true,
  ...restOfProps
}: SelectInputProps<Form>) => {
  const [displayLabel, setDisplayLabel] = useState('');
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController(controller);
  const { t } = useTranslation();

  const labelText = t(`inputs:label.${controller.name}`);
  const placeholderText = t(`inputs:placeholder.${controller.name}`);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      setDisplayLabel(selectedOption.label);
    }
  }, [value, options]);

  const onSelectItem = useCallback(
    (selectedValue: string, selectedLabel: string) => () => {
      onChange(selectedValue);
      setDisplayLabel(selectedLabel);
      setModalVisible(false);
    },
    [onChange],
  );

  const onInputPress = () => {
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  const renderItem = useCallback(
    ({ item }: { item: Option }) => (
      <PressableOption onPress={onSelectItem(item.value, item.label)}>
        <Text fontSize="lg">{item.label}</Text>
      </PressableOption>
    ),
    [onSelectItem],
  );

  return (
    <Pressable disabled={!editable} onPress={onInputPress}>
      <TextInput
        error={error?.message}
        label={labelText}
        placeholder={placeholderText}
        {...restOfProps}
        onBlur={onBlur}
        value={displayLabel}
        editable={false}
        readOnly
      />
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={onModalClose}
      >
        <Overlay>
          <BottomSheetContent>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={item => item.value.toString()}
              showsVerticalScrollIndicator={false}
            />
          </BottomSheetContent>
        </Overlay>
      </Modal>
    </Pressable>
  );
};

export default ControlledSelectInput;
