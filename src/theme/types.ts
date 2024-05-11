import { palette } from './colors';
import { sizes } from './sizes';
import { spacing } from './spacing';

type Color = string;
type Gradient = [Color, Color];

type RecordColorGradient = {
  default: Color;
  disabled: Color;
  hover: Color;
  pale: Color;
  palest: Color;
  pressed: Color;
  strong: Color;
  gradient: Gradient;
};

type RecordColor = Omit<RecordColorGradient, 'gradient'>;

export interface Theme {
  colors: {
    background: Color;
    foreground: Color;

    fill: {
      component: Color;
      page: Color;
      disabled: Color;
      section: Color;
    };

    stroke: {
      default: Color;
      focus: Color;
      underline: Color;
      underlineDisabled: Color;
      underlineHover: Color;
    };

    content: {
      disabled: Color;
      inverse: Color;
      pale: Color;
      strong: Color;
      subtle: Color;
    };

    neutral: RecordColor;

    primary: RecordColorGradient;

    secondary: RecordColor;

    feedback: {
      error: RecordColorGradient;
      info: RecordColor;
      success: RecordColor;
      warning: RecordColor;
    };
  };
  palette: typeof palette;
}

export interface ExtendedTheme extends Theme {
  dark: boolean;
  sizes: typeof sizes;
  spacing: typeof spacing;
}
