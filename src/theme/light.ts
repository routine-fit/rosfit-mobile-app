import { palette } from './colors';
import { Theme } from './types';

export const lightTheme: Theme = {
  colors: {
    background: palette.white, // Assuming you have a white color defined
    foreground: palette.neutral[900],

    fill: {
      page: palette.white,
      component: palette.white,
      disabled: palette.neutral[400],
      section: palette.neutral[100],
    },

    stroke: {
      default: palette.neutral[400],
      focus: palette.primary[400],
      underline: palette.neutral[700],
      underlineHover: palette.neutral[600],
      underlineDisabled: palette.neutral[500],
    },

    content: {
      strong: palette.neutral[900],
      subtle: palette.neutral[700],
      pale: palette.neutral[600],
      disabled: palette.neutral[500],
      inverse: palette.white,
    },

    neutral: {
      pale: palette.neutral[100],
      palest: palette.neutral[100],
      default: palette.neutral[500],
      disabled: palette.neutral[300],
      hover: palette.neutral[700],
      pressed: palette.neutral[800],
      strong: palette.neutral[700],
    },

    primary: {
      default: palette.primary[500],
      hover: palette.primary[700],
      pressed: palette.primary[800],
      disabled: palette.primary[300],

      strong: palette.primary[700],
      pale: palette.primary[200],
      palest: palette.primary[100],
      gradient: [palette.primary[700], palette.primary[400]],
    },

    secondary: {
      default: palette.secondary[500],
      disabled: palette.secondary[300],
      hover: palette.secondary[700],
      pale: palette.secondary[200],
      palest: palette.secondary[100],
      pressed: palette.secondary[800],
      strong: palette.secondary[700],
    },

    feedback: {
      error: {
        default: palette.red[500],
        hover: palette.red[700],
        pressed: palette.red[800],
        disabled: palette.red[200],

        strong: palette.red[700],
        pale: palette.red[200],
        palest: palette.red[100],
        gradient: [palette.red[700], palette.red[500]],
      },

      success: {
        default: palette.green[500],
        hover: palette.green[700],
        pressed: palette.green[800],
        disabled: palette.green[200],

        strong: palette.green[700],
        pale: palette.green[200],
        palest: palette.green[100],
      },

      info: {
        default: palette.blue[500],
        hover: palette.blue[700],
        pressed: palette.blue[800],
        disabled: palette.blue[200],

        strong: palette.blue[700],
        pale: palette.blue[200],
        palest: palette.blue[100],
      },

      warning: {
        default: palette.yellow[500],
        hover: palette.yellow[700],
        pressed: palette.yellow[800],
        disabled: palette.yellow[200],

        strong: palette.yellow[700],
        pale: palette.yellow[200],
        palest: palette.yellow[100],
      },
    },
  },
  palette,
};
