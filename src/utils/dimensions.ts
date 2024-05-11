import { Dimensions, Platform } from 'react-native';

export const getDeviceDimensions = () =>
  Dimensions.get(
    Platform.select({
      android: 'screen',
      default: 'window',
    }),
  );
