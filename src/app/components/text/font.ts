import { FontFamily, FontWeights } from './types';

export const getFontByWeight = (
  weight: FontWeights,
  fontFamily: FontFamily,
) => {
  return fonts[fontFamily][weight];
};

const fonts: Record<FontFamily, Record<FontWeights, string>> = {
  Roboto: {
    light: 'Roboto-Light',
    medium: 'Roboto-Medium',
    semiBold: 'Roboto-SemiBold',
    bold: 'Roboto-Bold',
  },
};
