import { useTheme } from 'styled-components';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import Text from '../../text';
import {
  ButtonContainer,
  getThemeVariantMap,
  LeftIconContainer,
  RightIconContainer,
} from './styles';
import { ButtonProps, ButtonStatus } from './types';

const Button: FC<ButtonProps> = ({
  size = 'lg',
  content,
  leadingIcon,
  trailingIcon,
  onPress,
  themeColor = 'primary',
  variant = 'filled',
  disabled,
  loading,
  fullWidth = true,
  marginTop,
  radius = 'rounded',
}) => {
  const theme = useTheme();
  const [status, setStatus] = useState<ButtonStatus>('default');

  const styling = useMemo(() => {
    const variantMap = getThemeVariantMap(theme);
    return variantMap[themeColor];
  }, [theme, themeColor]);

  const styles = styling[variant][status];

  useEffect(() => {
    if (disabled || loading) {
      setStatus('disabled');
    }
  }, [loading, disabled]);

  return (
    <ButtonContainer
      fullWidth={fullWidth}
      marginTop={marginTop}
      size={size}
      stringStyles={styles.button}
      onPress={onPress}
      onPressIn={() => setStatus('pressed')}
      disabled={disabled || loading}
      withTrailingIcon={!!trailingIcon}
      radius={radius}
      onFocus={() => setStatus('focus')}
      onPressOut={() => setStatus('default')}
      onBlur={() => setStatus('default')}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {leadingIcon !== undefined && (
            <LeftIconContainer>
              {React.cloneElement(leadingIcon, styles.content)}
            </LeftIconContainer>
          )}
          <Text
            fontSize={size}
            fontWeight="semiBold"
            color={styles.content.color}
          >
            {content}
          </Text>
          {trailingIcon !== undefined && (
            <RightIconContainer>
              {React.cloneElement(trailingIcon, styles.content)}
            </RightIconContainer>
          )}
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;
