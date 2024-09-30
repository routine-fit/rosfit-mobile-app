import styled from 'styled-components/native';

import { ExtendedTheme } from 'src/theme/types';

import { ButtonRadius, ButtonSize } from './types';

export const RightIconContainer = styled.View`
  margin-left: 8px;
`;
export const LeftIconContainer = styled.View`
  margin-right: 8px;
`;

const sizes = {
  sm: 32,
  m: 40,
  lg: 48,
  xl: 60,
};

const radius: Record<ButtonRadius, number> = {
  oval: 100,
  rounded: 8,
  square: 1,
};

export const ButtonContainer = styled.Pressable<{
  size: ButtonSize;
  radius: ButtonRadius;
  stringStyles?: string;
  fullWidth?: boolean;
  withTrailingIcon?: boolean;
  marginTop?: number;
}>`
  ${({ stringStyles }) => stringStyles || ''}
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  border-radius: ${props => radius[props.radius]}px;
  height: ${props => sizes[props.size]}px;
  margin-top: ${props => props.marginTop || 0}px;
  padding-left: ${props => props.theme.spacing.button.padding[props.size][1]};
  padding-right: ${props => props.theme.spacing.button.padding[props.size][1]};
  flex-direction: row;
  justify-content: ${({ withTrailingIcon }) =>
    withTrailingIcon ? 'space-between' : 'center'};
  align-items: center;
`;

export const getThemeVariantMap = (theme: ExtendedTheme) => {
  return {
    neutral: {
      filled: {
        default: {
          button: `background-color: ${theme.colors.neutral.palest};`,
          content: { color: theme.colors.content.subtle },
        },
        disabled: {
          button: `background-color: ${theme.colors.neutral.disabled};`,
          content: { color: theme.colors.content.disabled },
        },
        pressed: {
          button: `background-color: ${theme.colors.neutral.default};`,
          content: { color: theme.colors.content.subtle },
        },
        focus: {
          button: `background-color: ${theme.colors.neutral.palest};`,
          content: { color: theme.colors.content.subtle },
        },
      },
      outlined: {
        default: {
          button: `border: 1px solid ${theme.colors.neutral.pale};`,
          content: { color: theme.colors.content.subtle },
        },
        disabled: {
          button: `
                    border: 1px solid ${theme.colors.neutral.disabled};
                    background-color: ${theme.colors.fill.section};
                  `,
          content: { color: theme.colors.content.disabled },
        },
        pressed: {
          button: `
          border: 1px solid ${theme.colors.neutral.pale};
          background-color: ${theme.colors.neutral.palest};
        `,
          content: { color: theme.colors.content.subtle },
        },
        focus: {
          button: `border: 1px solid ${theme.colors.primary.default};`,
          content: { color: theme.colors.content.subtle },
        },
      },
      ghost: {
        default: {
          button: '',
          content: { color: theme.colors.content.subtle },
        },
        disabled: {
          button: ``,
          content: { color: theme.colors.content.disabled },
        },
        pressed: {
          button: `background-color: ${theme.colors.neutral.palest};`,
          content: { color: theme.colors.content.subtle },
        },
        focus: {
          button: '',
          content: { color: theme.colors.content.subtle },
        },
      },
    },
    secondary: {
      filled: {
        default: {
          button: `background-color: ${theme.colors.secondary.default};`,
          content: { color: theme.colors.content.inverse },
        },
        disabled: {
          button: `background-color: ${theme.colors.secondary.disabled};`,
          content: { color: theme.colors.content.inverse },
        },
        pressed: {
          button: `background-color: ${theme.colors.secondary.pressed};`,
          content: { color: theme.colors.content.inverse },
        },
        focus: {
          button: `background-color: ${theme.colors.secondary.default};`,
          content: { color: theme.colors.content.inverse },
        },
      },
      outlined: {
        default: {
          button: `border: 1px solid ${theme.colors.secondary.default};`,
          content: { color: theme.colors.secondary.default },
        },
        disabled: {
          button: `
                    border: 1px solid ${theme.colors.secondary.disabled};
                    background-color: ${theme.colors.secondary.palest};
                  `,
          content: { color: theme.colors.secondary.disabled },
        },
        pressed: {
          button: `
          border: 1px solid ${theme.colors.secondary.default};
          background-color: ${theme.colors.secondary.pale};
        `,
          content: { color: theme.colors.secondary.default },
        },
        focus: {
          button: `border: 1px solid ${theme.colors.primary.default};`,
          content: { color: theme.colors.secondary.default },
        },
      },
      ghost: {
        default: {
          button: '',
          content: { color: theme.colors.secondary.strong },
        },
        disabled: {
          button: ``,
          content: { color: theme.colors.secondary.disabled },
        },
        pressed: {
          button: `background-color: ${theme.colors.secondary.pale};`,
          content: { color: theme.colors.secondary.default },
        },
        focus: {
          button: '',
          content: { color: theme.colors.secondary.default },
        },
      },
    },
    primary: {
      filled: {
        default: {
          button: `background-color: ${theme.colors.primary.default};`,
          content: { color: theme.colors.content.inverse },
        },
        disabled: {
          button: `background-color: ${theme.colors.primary.disabled};`,
          content: { color: theme.colors.content.inverse },
        },
        pressed: {
          button: `background-color: ${theme.colors.primary.pressed};`,
          content: { color: theme.colors.content.inverse },
        },
        focus: {
          button: `background-color: ${theme.colors.primary.default};`,
          content: { color: theme.colors.content.inverse },
        },
      },
      outlined: {
        default: {
          button: `border: 1px solid ${theme.colors.primary.default};`,
          content: { color: theme.colors.primary.default },
        },
        disabled: {
          button: `
                    border: 1px solid ${theme.colors.primary.disabled};
                    background-color: ${theme.colors.primary.palest};
                  `,
          content: { color: theme.colors.primary.disabled },
        },
        pressed: {
          button: `
          border: 1px solid ${theme.colors.primary.default};
          background-color: ${theme.colors.primary.pale};
        `,
          content: { color: theme.colors.primary.default },
        },
        focus: {
          button: `border: 1px solid ${theme.colors.primary.default};`,
          content: { color: theme.colors.primary.default },
        },
      },
      ghost: {
        default: {
          button: '',
          content: { color: theme.colors.primary.default },
        },
        disabled: {
          button: ``,
          content: { color: theme.colors.primary.disabled },
        },
        pressed: {
          button: `background-color: ${theme.colors.primary.pale};`,
          content: { color: theme.colors.primary.default },
        },
        focus: {
          button: '',
          content: { color: theme.colors.primary.default },
        },
      },
    },
    error: {
      filled: {
        default: {
          button: `background-color: ${theme.colors.feedback.error.default};`,
          content: { color: theme.colors.content.inverse },
        },
        disabled: {
          button: `background-color: ${theme.colors.feedback.error.disabled};`,
          content: { color: theme.colors.content.inverse },
        },
        pressed: {
          button: `background-color: ${theme.colors.feedback.error.pressed};`,
          content: { color: theme.colors.content.inverse },
        },
        focus: {
          button: `background-color: ${theme.colors.feedback.error.default};`,
          content: { color: theme.colors.content.inverse },
        },
      },
      outlined: {
        default: {
          button: `border: 1px solid ${theme.colors.feedback.error.default};`,
          content: { color: theme.colors.feedback.error.default },
        },
        disabled: {
          button: `
              border: 1px solid ${theme.colors.feedback.error.pale};
              background-color: ${theme.colors.feedback.error.palest};`,
          content: { color: theme.colors.feedback.error.default },
        },
        pressed: {
          button: `
          border: 1px solid ${theme.colors.feedback.error.default};
          background-color: ${theme.colors.feedback.error.pale};
        `,
          content: { color: theme.colors.feedback.error.default },
        },
        focus: {
          button: `border: 1px solid ${theme.colors.feedback.error.default};`,
          content: { color: theme.colors.feedback.error.default },
        },
      },
      ghost: {
        default: {
          button: '',
          content: { color: theme.colors.feedback.error.default },
        },
        disabled: {
          button: ``,
          content: { color: theme.colors.feedback.error.default },
        },
        pressed: {
          button: `background-color: ${theme.colors.feedback.error.pale};`,
          content: { color: theme.colors.feedback.error.default },
        },
        focus: {
          button: '',
          content: { color: theme.colors.feedback.error.default },
        },
      },
    },
  };
};
