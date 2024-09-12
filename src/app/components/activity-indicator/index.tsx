import React, { FC } from 'react';

import { LottieAnimation } from '../lottie-animation';
import { Container } from './styles';
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
