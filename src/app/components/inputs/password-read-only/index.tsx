import React, { FC, useState } from 'react';
import {
  Box,
  EyeIcon as EyeIconComponent,
  EyeOffIcon as EyeOffIconComponent,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed';

interface Props {
  value: string;
}

const EyeIcon: FC = props => <EyeIconComponent {...props} />;

const EyeOffIcon: FC = props => <EyeOffIconComponent {...props} />;

export const PasswordReadOnly: FC<Props> = ({ value }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  return (
    <Box>
      <Input variant="underlined" size="md" isReadOnly={true} width={'auto'}>
        <InputField
          placeholder={'test'}
          type={showPassword ? 'text' : 'password'}
          value={value}
        />
        <InputSlot marginRight={16} onPress={handleState}>
          <InputIcon
            as={showPassword ? EyeIcon : EyeOffIcon}
            color="$textDark950"
          />
        </InputSlot>
      </Input>
    </Box>
  );
};
