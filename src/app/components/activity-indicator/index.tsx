import styled from 'styled-components/native';
import React, { FC } from 'react';

import { LottieAnimation } from '../lottie-animation';
import { Props } from './types';

export const CustomActivityIndicator: FC<Props> = ({
  height,
  width,
  isCentered,
  fullScreen,
}) => {
  return (
    <Container isCentered={isCentered} fullScreen={fullScreen}>
      <LottieAnimation
        width={width}
        height={height}
        source={require('src/assets/lottie/activityIndicator.json')}
      />
    </Container>
  );
};

const Container = styled.View<{ isCentered?: boolean; fullScreen?: boolean }>`
  flex: ${({ fullScreen }) => (fullScreen ? 1 : 'none')};
  align-self: ${({ isCentered }) => (isCentered ? 'center' : 'flex-start')};
  justify-content: ${({ isCentered }) =>
    isCentered ? 'center' : 'flex-start'};
`;
