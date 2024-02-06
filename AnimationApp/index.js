/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';

AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onPermissionRequest: function (status) {
    console.log('PERMISSION:', status);
  },

  requestPermissions: true,
});
