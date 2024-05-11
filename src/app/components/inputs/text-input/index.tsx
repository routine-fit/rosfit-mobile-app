import { AlertTriangleIcon } from 'lucide-react-native';
import { DefaultTheme, useTheme } from 'styled-components';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
} from 'react-native';

import Text from '../../text';
import {
  BottomTextContainer,
  Container,
  Input,
  InputContainer,
  LeftIconContainer,
  RightIconContainer,
} from './styles';
import { TextInputProps, WithIconProps } from './types';

const renderIcon = (
  IconComponent: React.ReactElement<WithIconProps> | undefined,
  theme: DefaultTheme,
) => {
  if (!IconComponent) return null;

  return React.cloneElement(IconComponent, {
    fill: theme.colors.neutral.strong,
    width: 24,
    height: 24,
  });
};

const TextInput = ({
  label,
  variant = 'outlined',
  isAmount,
  value,
  onChangeText,
  leadingIcon,
  trailingIcon,
  onTrailingIconPress,
  error,
  inputRef,
  helpText,
  ...restProps
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (restProps.onBlur) restProps.onBlur(e);
    setIsFocused(false);
  };

  return (
    <Container>
      {label && variant === 'outlined' && (
        <Text
          fontSize="xs"
          fontWeight="bold"
          color={theme.colors.content.subtle}
        >
          {label}
        </Text>
      )}
      <InputContainer variant={variant} error={error} isFocused={isFocused}>
        {leadingIcon && (
          <LeftIconContainer>
            {renderIcon(leadingIcon, theme)}
          </LeftIconContainer>
        )}
        {isAmount && (
          <Text
            fontSize="sm"
            fontWeight="bold"
            color={theme.colors.content.strong}
          >
            $
          </Text>
        )}
        <Input
          ref={inputRef as React.RefObject<RNTextInput>}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor={theme.colors.content.pale}
          blurOnSubmit={false}
          onFocus={() => setIsFocused(true)}
          {...restProps}
          onBlur={handleOnBlur}
          placeholder={restProps.placeholder || label}
        />
        {trailingIcon && (
          <RightIconContainer
            disabled={!onTrailingIconPress}
            onPress={onTrailingIconPress}
          >
            {renderIcon(trailingIcon, theme)}
          </RightIconContainer>
        )}
        {error && (
          <RightIconContainer hasTrailingIcon={!!trailingIcon}>
            <AlertTriangleIcon stroke={theme.colors.feedback.error.default} />
          </RightIconContainer>
        )}
      </InputContainer>
      <BottomTextContainer>
        {helpText && (
          <Text
            fontSize="xs"
            color={theme.colors.content.subtle}
            fontWeight="medium"
          >
            {helpText}
          </Text>
        )}
        {error && (
          <Text
            fontSize="xs"
            color={theme.colors.feedback.error.default}
            fontWeight="medium"
          >
            {error}
          </Text>
        )}
      </BottomTextContainer>
    </Container>
  );
};

export default React.forwardRef<RNTextInput, TextInputProps>((props, ref) => (
  <TextInput {...props} inputRef={ref} />
));
