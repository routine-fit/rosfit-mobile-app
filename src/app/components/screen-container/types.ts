import React from 'react';

export interface Props {
  children: React.ReactNode;
  withKeyboardAvoidingView?: boolean;
  withTopSpacing?: boolean;
  backgroundColor?: string;
  withHeight?: boolean;
  isLoading?: boolean;
  withoutVerticalPadding?: boolean;
}
