import React from 'react';

// import { NavigationActions } from 'react-navigation'

// export const navigationRef = React.createRef<any>()

// export const navigate = (routeName: string, params?: object) => {
//   navigationRef.current?.dispatch(
//     NavigationActions.navigate({
//       routeName,
//       params,
//     }),
//   )
// }

// export const goBack = () => {
//   navigationRef.current?.dispatch(NavigationActions.back())
// }

// This is fallback of old navigation system, created for temporary
import NavigationService from 'src/utils/NavigationService';

export const navigate = (routeName: string, params?: object) => {
  NavigationService.navigate(routeName, params);
};

export const goBack = () => {
  NavigationService.goBack();
};
