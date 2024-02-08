import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/StackedScreens/Home';
import Login from '../screens/StackedScreens/Login';

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="stack.login">
      <Stack.Screen name="stack.home" component={Home} />
      <Stack.Screen name="stack.login" component={Login} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
