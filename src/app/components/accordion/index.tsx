import { ChevronUp } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';

import Text from '../text';
import { Body, ChevronCell, Container, Header } from './styles';
import { AccordionProps } from './types';

export const AccordionItem: FC<AccordionProps> = ({ title, count, body }) => {
  const [showContent, setshowContent] = useState<boolean>(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const animationController = useRef(new Animated.Value(0)).current;

  const chevronTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const toggleAnimation = {
    duration: 500,
    update: {
      duration: 300,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 200,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  };

  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setshowContent(!showContent);
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={toggleListItem}>
        <Header>
          <Text>{title}</Text>
          <ChevronCell>
            <Text>{t('screens:weeklyExercises.exercises', { count })}</Text>
            <Animated.View
              style={{ transform: [{ rotateZ: chevronTransform }] }}
            >
              <ChevronUp color={theme.colors.primary.default} />
            </Animated.View>
          </ChevronCell>
        </Header>
      </TouchableWithoutFeedback>
      {showContent && <Body>{body}</Body>}
    </Container>
  );
};
