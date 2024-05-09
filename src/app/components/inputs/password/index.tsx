import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { TextInput as RNTextInput } from 'react-native/types';

import ControlledTextInput from '../controlled';
import { FormTextFieldProps } from '../controlled/types';

const PasswordInputInner = <Form extends FieldValues>(
  { controller, ...restOfProps }: FormTextFieldProps<Form>,
  ref: React.RefObject<RNTextInput>,
) => {
  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  const theme = useTheme();

  return (
    <ControlledTextInput
      controller={controller}
      secureTextEntry={secureEntry}
      trailingIcon={
        secureEntry ? (
          <EyeIcon color={theme.colors.stroke.default} fillOpacity={0} />
        ) : (
          <EyeOffIcon color={theme.colors.stroke.default} fillOpacity={0} />
        )
      }
      onTrailingIconPress={() => {
        setSecureEntry(prev => !prev);
      }}
      {...restOfProps}
      inputRef={ref}
    />
  );
};

const PasswordInput = React.forwardRef(PasswordInputInner);

export default PasswordInput;
