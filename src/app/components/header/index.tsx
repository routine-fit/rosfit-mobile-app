import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, ButtonText } from '@gluestack-ui/themed';

interface Props {
  navigation: any;
  leftText?: string;
  leftIcon?: React.ReactNode;
  headerTitle?: string;
  rightText?: string;
  rightButton?: React.ReactNode;
}

export const Header: FC<Props> = ({
  navigation,
  leftText,
  leftIcon,
  headerTitle,
  rightText,
  rightButton,
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
      {(leftText || leftIcon) && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {leftIcon && leftText ? (
            <Box flexDirection="row" alignItems="center">
              <Box marginRight={5}>{leftIcon}</Box>
              <ButtonText>{leftText}</ButtonText>
            </Box>
          ) : leftIcon ? (
            <Box>{leftIcon}</Box>
          ) : leftText ? (
            <ButtonText>{leftText}</ButtonText>
          ) : null}
        </TouchableOpacity>
      )}

      <Box flex={1} alignItems="center">
        {headerTitle && (
          <ButtonText fontWeight="$bold">{headerTitle}</ButtonText>
        )}
      </Box>

      {rightText && rightButton ? (
        <Box flexDirection="row" alignItems="center">
          <ButtonText>{rightText}</ButtonText>
          <Box marginLeft={5}>{rightButton}</Box>
        </Box>
      ) : rightText ? (
        <ButtonText>{rightText}</ButtonText>
      ) : rightButton ? (
        <Box>{rightButton}</Box>
      ) : null}
    </Box>
  );
};
