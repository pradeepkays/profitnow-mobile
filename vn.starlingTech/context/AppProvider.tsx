import React, {ReactNode, useEffect} from 'react';
import {
  ColorSchemeName,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {StarlingContainer} from '@starlingtech/element';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {shallow} from 'zustand/shallow';

import settings from '@vn.starlingTech/config/settings';
import {AppThemeType, useAppBaseStore} from '@vn.starlingTech/store/baseStore';
import dark from '@vn.starlingTech/theme/color/dark';
import light from '@vn.starlingTech/theme/color/light';

import {handlerStatusBar} from '../theme/theming';

import '../config/ReactotronConfig';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 1}},
});

type Props = {
  children: ReactNode;
  onReady?: () => void;
};

export default function AppProvider(props: Props) {
  const color = useColorScheme();
  const [theme, dispatchTheme] = useAppBaseStore(
    s => [s.theme, s.dispatchTheme],
    shallow,
  );
  const {colors} = getAppTheme(theme, color);

  useEffect(() => {
    if (settings.THEME === 'auto' && color) {
      dispatchTheme(color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBar: {
      height: STATUSBAR_HEIGHT ?? 0,
    },
  });

  const MyStatusBar = ({backgroundColor, ...props}: any) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <SafeAreaProvider>
      <StarlingContainer theme={{colors}}>
        <>
          {/* <MyStatusBar barStyle={'dark-content'} backgroundColor={'#fff'} /> */}

          <StatusBar
            // @ts-ignore
            barStyle={'dark-content'}
            backgroundColor={'#fff'}
            translucent={false}
          />
          {/* <NavigationContainer onReady={props?.onReady} theme={navigationTheme}> */}
          <QueryClientProvider client={queryClient}>
            {props.children}
          </QueryClientProvider>
          {/* </NavigationContainer> */}
          <FlashMessage textProps={{allowFontScaling: false}} position="top" />
        </>
      </StarlingContainer>
    </SafeAreaProvider>
  );
}

export function getAppTheme(theme: AppThemeType, color: ColorSchemeName) {
  if (theme === 'dark' || (theme === 'auto' && color === 'dark')) {
    handlerStatusBar('dark');
    return {
      colors: dark,
      // navigationTheme: NavigationDarkTheme,
    };
  }
  handlerStatusBar('light');
  return {
    colors: light,
    // navigationTheme: NavigationDefaultTheme,
  };
}
