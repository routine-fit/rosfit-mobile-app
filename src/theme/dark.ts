import { palette } from './colors';
import { Theme } from './types';

export const darkTheme: Theme = {
  colors: {
    background: palette.neutral[900],
    foreground: palette.neutral[800],

    fill: {
      page: palette.black,
      component: palette.black,
      disabled: palette.neutral[700],
      section: palette.neutral[700],
    },

    stroke: {
      default: palette.neutral[600],
      focus: palette.primary[400],
      underline: palette.neutral[400],
      underlineHover: palette.neutral[500],
      underlineDisabled: palette.neutral[600],
    },

    content: {
      strong: palette.neutral[100],
      subtle: palette.neutral[300],
      pale: palette.neutral[500],
      disabled: palette.neutral[600],
      inverse: palette.neutral[900],
    },

    neutral: {
      pale: palette.neutral[800],
      palest: palette.neutral[900],
      default: palette.neutral[500],
      disabled: palette.neutral[300],
      hover: palette.neutral[700],
      pressed: palette.neutral[800],
      strong: palette.neutral[700],
    },

    primary: {
      default: palette.primary[400],
      hover: palette.primary[300],
      pressed: palette.primary[200],
      disabled: palette.primary[600],

      strong: palette.primary[200],
      pale: palette.primary[800],
      palest: palette.primary[900],
      gradient: [palette.primary[700], palette.primary[400]],
    },

    secondary: {
      default: palette.secondary[500],
      disabled: palette.secondary[200],
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
        disabled: palette.red[100],

        strong: palette.red[200],
        pale: palette.red[700],
        palest: palette.red[800],
        gradient: [palette.red[200], palette.red[500]],
      },

      success: {
        default: palette.green[500],
        hover: palette.green[700],
        pressed: palette.green[800],
        disabled: palette.green[100],

        strong: palette.green[200],
        pale: palette.green[700],
        palest: palette.green[800],
      },

      info: {
        default: palette.blue[500],
        hover: palette.blue[700],
        pressed: palette.blue[800],
        disabled: palette.blue[200],

        strong: palette.blue[200],
        pale: palette.blue[700],
        palest: palette.blue[800],
      },

      warning: {
        default: palette.yellow[500],
        hover: palette.yellow[700],
        pressed: palette.yellow[800],
        disabled: palette.yellow[200],

        strong: palette.yellow[200],
        pale: palette.yellow[700],
        palest: palette.yellow[800],
      },
    },
  },
  palette,
};
