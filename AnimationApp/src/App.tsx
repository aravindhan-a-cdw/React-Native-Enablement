/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './navigations/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {/* <SafeAreaView style={backgroundStyle}> */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <GestureHandlerRootView> */}
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      {/* </GestureHandlerRootView> */}
      {/* </SafeAreaView> */}
    </>
  );
}

export default App;
