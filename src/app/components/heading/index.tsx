import { InfoIcon } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC } from 'react';

import { Spacer } from '../common';
import Text from '../text';
import {
  getHeadingStyle,
  HeadingContainer,
  HelpIconContainer,
  TitleContainer,
} from './styles';
import { HeadingProps } from './types';

const Heading: FC<HeadingProps> = ({
  type = 'h2',
  title,
  supportiveText,
  bottomSpace = true,
  onHelpClick,
  color,
  supportiveTextColor,
  shrink = false,
  flexTitleAlign,
}) => {
  const theme = useTheme();
  const styling = getHeadingStyle(theme, type);

  return (
    <HeadingContainer bottomSpace={bottomSpace} shrink={shrink}>
      <TitleContainer flexAlign={flexTitleAlign}>
        <Text {...styling.heading} color={color ?? styling.heading.color}>
          {title}
        </Text>
        {onHelpClick && (
          <HelpIconContainer onPress={onHelpClick}>
            <InfoIcon
              height={16}
              width={16}
              fillOpacity={0}
              color={theme.colors.content.pale}
            />
          </HelpIconContainer>
        )}
      </TitleContainer>
      {supportiveText && <Spacer size={styling.spacerHeight} vertical />}
      {supportiveText && (
        <Text
          {...styling.supportiveText}
          color={supportiveTextColor ?? styling.supportiveText.color}
        >
          {supportiveText}
        </Text>
      )}
    </HeadingContainer>
  );
};

export default Heading;
