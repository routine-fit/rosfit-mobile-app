import { Plus, Trash } from 'lucide-react-native';
import React, { FC } from 'react';
import { useFieldArray } from 'react-hook-form';
import { View } from 'react-native';

import {
  Button,
  ControlledSelectInput,
  ControlledTextInput,
  IconButton,
} from 'src/app/components';
import { AccordionItem } from 'src/app/components/accordion';

import { ExerciseContainer, InputContainer, Row } from './styles';
import { ExerciseItemProps } from './types';

export const ExerciseItem: FC<ExerciseItemProps> = ({
  item,
  index,
  control,
}) => {
  const {
    fields: seriesFields,
    append,
    remove,
  } = useFieldArray({
    name: `exercises.${index}.series`,
    control,
  });

  return (
    <AccordionItem
      title={item.name}
      body={
        <ExerciseContainer>
          <ControlledTextInput
            label="Repeticiones"
            controller={{
              control,
              name: `exercises.${index}.repetitions`,
            }}
            placeholder=""
            keyboardType="numeric"
          />
          <ControlledTextInput
            label="Tiempo de descanso"
            controller={{
              control,
              name: `exercises.${index}.restTimeSecs`,
            }}
            placeholder=""
            keyboardType="numeric"
          />
          {seriesFields.map((field, seriesIndex) => (
            <View key={field.id}>
              <Row>
                <InputContainer>
                  <ControlledTextInput
                    label={`Peso de la serie ${seriesIndex + 1}`}
                    controller={{
                      control,
                      name: `exercises.${index}.series.${seriesIndex}.weight`,
                    }}
                    placeholder="Peso"
                    keyboardType="numeric"
                  />
                  <ControlledSelectInput
                    label={'Medida de peso'}
                    controller={{
                      control,
                      name: `exercises.${index}.series.${seriesIndex}.weightMeasure`,
                    }}
                    placeholder=" "
                    options={[
                      { label: 'kg', value: 'kg' },
                      { label: 'lb', value: 'lb' },
                    ]}
                  />
                </InputContainer>
                <IconButton
                  variant="ghost"
                  iconProp="stroke"
                  themeColor="error"
                  icon={<Trash />}
                  disabled={seriesFields.length === 1}
                  onPress={() => remove(seriesIndex)}
                />
              </Row>
            </View>
          ))}
          <Button
            content="Agregar Serie"
            variant="outlined"
            trailingIcon={<Plus />}
            onPress={() =>
              append({
                order: seriesFields.length + 1,
                weight: '',
                weightMeasure: 'kg',
              })
            }
          />
        </ExerciseContainer>
      }
    />
  );
};
