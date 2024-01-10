import React from 'react';
import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';

import { GoogleIcon } from 'src/assets/svg/social-media/google';

import { GoogleSignInProps } from './types';

const GoogleSignInButton = ({ onPress }: GoogleSignInProps) => {
  return (
    <Button
      marginBottom="$4"
      backgroundColor="#FFFFFF"
      borderColor="#DADCE0"
      borderWidth={1}
      borderRadius={20}
      onPress={onPress}
    >
      <ButtonIcon as={GoogleIcon} />
      <ButtonText ml="$6" color="#3C4043">
        Sign in with Google
      </ButtonText>
    </Button>
  );
};

export default GoogleSignInButton;
