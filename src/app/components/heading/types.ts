import { FontSizes, FontWeights } from '../text/types';

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export type FlexTitleAlign = 'flex-start' | 'flex-end' | 'center';

export interface HeadingProps {
  title: string | React.JSX.Element;
  type?: HeadingType;
  supportiveText?: string | React.JSX.Element;
  supportiveTextColor?: string;
  bottomSpace?: boolean;
  onHelpClick?: () => void;
  color?: string;
  shrink?: boolean;
  flexTitleAlign?: FlexTitleAlign;
}

interface Style {
  fontSize: FontSizes;
  fontWeight: FontWeights;
  color: string;
}

interface HeadingStyle {
  heading: Style;
  supportiveText: Style;
  spacerHeight: number;
}

export type HeadingStyles = Record<HeadingType, HeadingStyle>;
