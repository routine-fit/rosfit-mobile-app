import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';

import { Container, getThemeVariantMap } from './styles';
import { IconButtonProps } from './types';

const IconButton: FC<IconButtonProps> = ({
  size = 'm',
  disabled,
  loading,
  variant = 'filled',
  themeColor = 'primary',
  icon,
  onPress,
  iconProp = 'fill',
  ...rest
}) => {
  const theme = useTheme();
  const styling = useMemo(() => getThemeVariantMap(theme), [theme]);
  const styles =
    styling[variant][themeColor][disabled || loading ? 'disabled' : 'default'];

  return (
    <Container
      disabled={disabled}
      onPress={onPress}
      size={size}
      variantStyles={styles.button}
      {...rest}
    >
      {React.cloneElement(icon, { [iconProp]: styles.contentColor })}
    </Container>
  );
};
export default IconButton;
