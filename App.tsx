import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {RootNavigator} from './src/navigation';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import "./src/config/i18n"


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <StatusBar
          backgroundColor="transparent"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <RootNavigator />
      </Provider>
    </View>
  );
};

export default App;
