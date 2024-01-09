import React from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, Text } from 'react-native';

import { ControlledInput } from 'src/components/inputs';

export const LoginScreen = () => {
  const { control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <ControlledInput
        controller={{
          control,
          name: 'email',
        }}
        label="Email"
        inputFieldProps={{
          placeholder: 'john.doe@example.com',
        }}
      />
    </SafeAreaView>
  );
};
