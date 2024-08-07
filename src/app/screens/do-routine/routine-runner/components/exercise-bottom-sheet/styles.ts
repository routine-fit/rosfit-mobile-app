import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { BottomSheetView } from '@gorhom/bottom-sheet';

export const StyledBottomSheetView = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  padding-bottom: 20px;
  padding-horizontal: 20px;
  gap: 10px;
  width: 100%;
`;

export const LottieContainer = styled.View`
  height: 100px;
  width: 100px;
`;

export const StyledLottieView = styled(LottieView)`
  flex: 1;
`;
