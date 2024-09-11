import styled, { DefaultTheme } from 'styled-components/native';

import { IconButtonSizes } from './types';

export const Container = styled.TouchableOpacity<{
  variantStyles: string;
  size: IconButtonSizes;
}>`
  padding: ${props => (props.size === 'm' ? '10px' : '6px')};
  border-radius: 4px;
  ${props => props.variantStyles}
`;

export const getThemeVariantMap = (theme: DefaultTheme) => {
  return {
    filled: {
      primary: {
        default: {
          button: `background-color: ${theme.colors.primary.default};`,
          contentColor: theme.colors.content.inverse,
        },
        disabled: {
          button: `background-color: ${theme.colors.primary.disabled};`,
          contentColor: theme.colors.content.inverse,
        },
      },
      secondary: {
        default: {
          button: `border: 1px solid ${theme.colors.secondary.default};`,
          contentColor: theme.colors.secondary.default,
        },
        disabled: {
          button: `
                  border: 1px solid ${theme.colors.secondary.disabled};
                  background-color: ${theme.colors.secondary.palest};
                `,
          contentColor: theme.colors.secondary.disabled,
        },
      },
      neutral: {
        default: {
          button: `background-color: ${theme.colors.neutral.pale};`,
          contentColor: theme.colors.content.subtle,
        },
        disabled: {
          button: `
                  border: 1px solid ${theme.colors.neutral.disabled};
                  background-color: ${theme.colors.neutral.palest};
                `,
          contentColor: theme.colors.neutral.disabled,
        },
      },
      error: {
        default: {
          button: `border: 1px solid ${theme.colors.feedback.error.default};`,
          contentColor: theme.colors.feedback.error.default,
        },
        disabled: {
          button: `
                  border: 1px solid ${theme.colors.feedback.error.disabled};
                  background-color: ${theme.colors.feedback.error.palest};
                `,
          contentColor: theme.colors.feedback.error.disabled,
        },
      },
      success: {
        default: {
          button: `border: 1px solid ${theme.colors.feedback.success.default};`,
          contentColor: theme.colors.feedback.success.default,
        },
        disabled: {
          button: `
                  border: 1px solid ${theme.colors.feedback.success.disabled};
                  background-color: ${theme.colors.feedback.success.palest};
                `,
          contentColor: theme.colors.feedback.success.disabled,
        },
      },
      content: {
        default: {
          button: `border: 1px solid ${theme.colors.content.subtle};`,
          contentColor: theme.colors.content.subtle,
        },
        disabled: {
          button: `
                  border: 1px solid ${theme.colors.content.disabled};
                  background-color: ${theme.colors.content.pale};
                `,
          contentColor: theme.colors.content.disabled,
        },
      },
    },
    outlined: {
      primary: {
        default: {
          button: `border: 1px solid ${theme.colors.primary.default};`,
          contentColor: theme.colors.primary.default,
        },
        disabled: {
          button: `
                  border: 1px solid ${theme.colors.primary.disabled};
                  background-color: ${theme.colors.primary.palest};
                `,
          contentColor: theme.colors.primary.disabled,
        },
      },
      secondary: {
        default: {
          button: `background-color: ${theme.colors.secondary.default};`,
          contentColor: theme.colors.content.inverse,
        },
        disabled: {
          button: `background-color: ${theme.colors.secondary.disabled};`,
          contentColor: theme.colors.content.inverse,
        },
      },
      neutral: {
        default: {
          button: `background-color: ${theme.colors.neutral.default};`,
          contentColor: theme.colors.content.inverse,
        },
        disabled: {
          button: `background-color: ${theme.colors.neutral.disabled};`,
          contentColor: theme.colors.content.inverse,
        },
      },
      error: {
        default: {
          button: `background-color: ${theme.colors.feedback.error.default};`,
          contentColor: theme.colors.content.inverse,
        },
        disabled: {
          button: `background-color: ${theme.colors.feedback.error.disabled};`,
          contentColor: theme.colors.content.inverse,
        },
      },
      success: {
        default: {
          button: `background-color: ${theme.colors.feedback.success.default};`,
          contentColor: theme.colors.content.inverse,
        },
        disabled: {
          button: `background-color: ${theme.colors.feedback.success.disabled};`,
          contentColor: theme.colors.content.inverse,
        },
      },
      content: {
        default: {
          button: `background-color: ${theme.colors.content.subtle};`,
          contentColor: theme.colors.content.inverse,
        },
        disabled: {
          button: `background-color: ${theme.colors.content.disabled};`,
          contentColor: theme.colors.content.inverse,
        },
      },
    },
    ghost: {
      primary: {
        default: {
          button: '',
          contentColor: theme.colors.primary.default,
        },
        disabled: {
          button: `background-color: ${theme.colors.primary.palest};`,
          contentColor: theme.colors.primary.disabled,
        },
      },
      secondary: {
        default: {
          button: '',
          contentColor: theme.colors.secondary.default,
        },
        disabled: {
          button: `background-color: ${theme.colors.secondary.palest};`,
          contentColor: theme.colors.secondary.disabled,
        },
      },
      neutral: {
        default: {
          button: '',
          contentColor: theme.colors.content.subtle,
        },
        disabled: {
          button: `background-color: ${theme.colors.neutral.palest};`,
          contentColor: theme.colors.content.subtle,
        },
      },
      error: {
        default: {
          button: '',
          contentColor: theme.colors.feedback.error.default,
        },
        disabled: {
          button: ``,
          contentColor: theme.colors.feedback.error.disabled,
        },
      },
      success: {
        default: {
          button: '',
          contentColor: theme.colors.feedback.success.default,
        },
        disabled: {
          button: `background-color: ${theme.colors.feedback.success.palest};`,
          contentColor: theme.colors.feedback.success.disabled,
        },
      },
      content: {
        default: {
          button: '',
          contentColor: theme.colors.content.pale,
        },
        disabled: {
          button: `background-color: ${theme.colors.content.pale};`,
          contentColor: theme.colors.content.disabled,
        },
      },
    },
  };
};
