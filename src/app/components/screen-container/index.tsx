import React, { FC, useMemo } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

import { getDeviceDimensions } from 'src/utils/dimensions';

import { LoadingContainer, Spacer } from '../common';
import {
  InnerContainer,
  InnerKeyboardContainer,
  MainContainer,
} from './styles';
import { Props } from './types';

const isAndroid = Platform.OS === 'android';

const ScreenContainer: FC<Props> = ({
  children,
  withTopSpacing,
  withKeyboardAvoidingView,
  backgroundColor,
  withHeight,
  isLoading,
  withoutVerticalPadding = false,
}) => {
  const headerHeight = useHeaderHeight();
  const insights = initialWindowMetrics;
  const { height } = getDeviceDimensions();

  const totalHeight = useMemo(
    () =>
      Math.ceil(height) -
      Math.ceil(headerHeight) -
      Math.ceil(insights?.insets?.bottom || 0),
    [height, insights, headerHeight],
  );

  return (
    <MainContainer backgroundColor={backgroundColor}>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" />
        </LoadingContainer>
      ) : (
        <>
          {withKeyboardAvoidingView && (
            <InnerKeyboardContainer
              withTopSpacing={withTopSpacing}
              behavior={isAndroid ? 'height' : 'padding'}
              keyboardVerticalOffset={isAndroid ? 0 : headerHeight}
            >
              {children}
              <Spacer size={24} vertical />
            </InnerKeyboardContainer>
          )}
          {!withKeyboardAvoidingView && (
            <InnerContainer
              withTopSpacing={withTopSpacing}
              withHeight={withHeight}
              height={totalHeight}
              withoutVerticalPadding={withoutVerticalPadding}
            >
              {children}
            </InnerContainer>
          )}
        </>
      )}
    </MainContainer>
  );
};

export default ScreenContainer;
