import React, { FC } from 'react';

import { LottieContainer, StyledLottieView } from './styles';
import { Props } from './types';

export const LottieAnimation: FC<Props> = ({
  source,
  autoplay = true,
  loop = true,
  width,
  height,
}) => {
  return (
    <LottieContainer width={width} height={height}>
      <StyledLottieView source={source} autoPlay={autoplay} loop={loop} />
    </LottieContainer>
  );
};
