import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

export const LottieContainer = styled.View<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  height: ${({ height }) => (height ? `${height}px` : '100px')};
`;

export const StyledLottieView = styled(LottieView)`
  flex: 1;
`;
