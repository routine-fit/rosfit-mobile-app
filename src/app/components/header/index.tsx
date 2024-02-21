import React, { FC, ReactNode } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Box, ButtonText } from '@gluestack-ui/themed';

interface Props {
  leftText?: string | ((props: any) => ReactNode) | undefined;
  headerLeft?: React.ReactNode;
  headerTitle?: string | ((props: any) => ReactNode) | undefined;
  rightText?: string;
  rightButton?: React.ReactNode;
  onPressLeft?: () => void;
}

export const Header: FC<Props> = ({
  leftText,
  headerLeft,
  headerTitle,
  rightText,
  rightButton,
  onPressLeft,
}) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="$lime600"
      paddingHorizontal={15}
      paddingTop={20}
      height={65}
      borderBottomLeftRadius={15}
    >
      {(leftText || headerLeft) && (
        <TouchableWithoutFeedback onPress={onPressLeft}>
          {headerLeft && leftText ? (
            <Box flexDirection="row" alignItems="center">
              <Box marginRight={10}>{headerLeft}</Box>
              <ButtonText>{leftText}</ButtonText>
            </Box>
          ) : headerLeft ? (
            <Box>{headerLeft}</Box>
          ) : leftText ? (
            <ButtonText>{leftText}</ButtonText>
          ) : null}
        </TouchableWithoutFeedback>
      )}

      <Box flex={1} alignItems="center">
        {headerTitle && (
          <ButtonText fontWeight="$bold">{headerTitle}</ButtonText>
        )}
      </Box>

      {rightText && rightButton ? (
        <Box flexDirection="row" alignItems="center">
          <ButtonText>{rightText}</ButtonText>
          <Box marginLeft={10}>{rightButton}</Box>
        </Box>
      ) : rightText ? (
        <ButtonText>{rightText}</ButtonText>
      ) : rightButton ? (
        <Box>{rightButton}</Box>
      ) : null}
    </Box>
  );
};
