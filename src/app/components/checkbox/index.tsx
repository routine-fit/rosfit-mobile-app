import React, { useCallback, useEffect, useState } from 'react';

import { CheckboxContainer, CheckMark, Container, Label } from './styles';
import { CheckboxProps } from './types';

export const Checkbox: React.FC<CheckboxProps> = ({
  size = 25,
  fillColor = 'primary',
  text = '',
  isChecked = false,
  onPress,
}) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handlePress = useCallback(() => {
    const newChecked = !checked;
    setChecked(newChecked);
    onPress && onPress(newChecked);
  }, [checked, onPress]);

  return (
    <Container onPress={handlePress}>
      <CheckboxContainer size={size} checked={checked} fillColor={fillColor}>
        {checked && <CheckMark size={size} />}
      </CheckboxContainer>
      {text && <Label>{text}</Label>}
    </Container>
  );
};
