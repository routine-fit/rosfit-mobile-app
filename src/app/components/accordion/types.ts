import { JSX } from 'react';

export interface AccordionProps {
  title: string;
  count?: number;
  body: JSX.Element | JSX.Element[];
}
