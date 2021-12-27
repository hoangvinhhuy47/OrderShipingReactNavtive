/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/router/App';
import {name as appName} from './app.json';
import configureStore from './src/redux/store';
import React, { useEffect } from 'react'
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import {persistor} from './src/redux/store'
import CodePush from 'react-native-code-push'


const onBeforeLift = () => {
  // take some action before the gate lifts
}
const app = () => (
    <StoreProvider store={configureStore}>
      <PersistGate loading={<></>}
      onBeforeLift={onBeforeLift}
      persistor={persistor}>
      <App />
      </PersistGate>
    </StoreProvider>
  );
  let codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.IMMEDIATE,
  };

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => CodePush(codePushOptions)(app));
