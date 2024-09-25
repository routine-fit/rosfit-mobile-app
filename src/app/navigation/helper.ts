import { NavigationContainerRefWithCurrent } from '@react-navigation/native';

import { RootStackParamList } from './types';

export let navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>;

export const setNavigationRef = (
  _ref: NavigationContainerRefWithCurrent<RootStackParamList>,
) => {
  navigationRef = _ref;
};

const getNavigationRef = () => {
  return navigationRef.current;
};

export const getActiveRoute = () => {
  return navigationRef?.getCurrentRoute();
};

export default getNavigationRef;
