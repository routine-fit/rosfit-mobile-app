import styled from 'styled-components/native';

import { FlexTitleAlign, HeadingStyles, HeadingType } from './types';

export const TitleContainer = styled.View<{ flexAlign?: FlexTitleAlign }>`
  flex-direction: row;
  ${props => (props.flexAlign ? `justify-content: ${props.flexAlign}` : '')};
`;

export const HelpIconContainer = styled.TouchableOpacity`
  margin-left: 8px;
  justify-content: center;
`;

export const HeadingContainer = styled.View<{
  bottomSpace: boolean;
  shrink: boolean;
}>`
  ${({ bottomSpace }) => (bottomSpace ? 'margin-bottom: 24px;' : '')}
  ${({ shrink }) => (shrink ? 'flex-shrink: 1;' : '')}
`;

export const getHeadingStyle = (theme: any, type: HeadingType) => {
  const styles: HeadingStyles = {
    h1: {
      heading: {
        fontSize: '3xl',
        fontWeight: 'semiBold',
        color: theme.colors.content.strong,
      },
      supportiveText: {
        fontSize: 'm',
        fontWeight: 'medium',
        color: theme.colors.content.subtle,
      },
      spacerHeight: 8,
    },
    h2: {
      heading: {
        fontSize: '2xl',
        fontWeight: 'semiBold',
        color: theme.colors.content.strong,
      },
      supportiveText: {
        fontSize: 'm',
        fontWeight: 'medium',
        color: theme.colors.content.subtle,
      },
      spacerHeight: 8,
    },
    h3: {
      heading: {
        fontSize: 'xl',
        fontWeight: 'semiBold',
        color: theme.colors.content.strong,
      },
      supportiveText: {
        fontSize: 'm',
        fontWeight: 'medium',
        color: theme.colors.content.subtle,
      },
      spacerHeight: 8,
    },
    h4: {
      heading: {
        fontSize: 'm',
        fontWeight: 'semiBold',
        color: theme.colors.content.strong,
      },
      supportiveText: {
        fontSize: 'sm',
        fontWeight: 'medium',
        color: theme.colors.content.subtle,
      },
      spacerHeight: 4,
    },
    h5: {
      heading: {
        fontSize: 'sm',
        fontWeight: 'semiBold',
        color: theme.colors.content.strong,
      },
      supportiveText: {
        fontSize: 'xs',
        fontWeight: 'medium',
        color: theme.colors.content.subtle,
      },
      spacerHeight: 4,
    },
  };
  return styles[type];
};
