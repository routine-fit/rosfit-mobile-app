import { useTheme } from 'styled-components';
import React, { FC } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import Text from '../text';
import { Container, Content, CurvedContainer, TitleWrapper } from './styles';
import { HeaderProps } from './types';

const Header: FC<HeaderProps> = ({
  leftText,
  headerLeft,
  onPressLeft,
  headerTitle,
  rightText,
  rightButton,
  onPressRight,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <CurvedContainer>
        {(leftText || headerLeft) && (
          <TouchableWithoutFeedback onPress={onPressLeft}>
            <Content>
              {headerLeft}
              <Text color={theme.colors.content.inverse}>{leftText}</Text>
            </Content>
          </TouchableWithoutFeedback>
        )}

        <TitleWrapper>
          {typeof headerTitle === 'string' && (
            <Text fontWeight="bold" color={theme.colors.content.inverse}>
              {headerTitle}
            </Text>
          )}
        </TitleWrapper>

        {(rightText || rightButton) && (
          <TouchableWithoutFeedback onPress={onPressRight}>
            <Content>
              {rightButton}
              <Text color={theme.colors.content.inverse}>{rightText}</Text>
            </Content>
          </TouchableWithoutFeedback>
        )}
      </CurvedContainer>
    </Container>
  );
};

export default Header;
