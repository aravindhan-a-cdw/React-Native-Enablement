import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/StackedScreens/Home';
import Login from '../screens/StackedScreens/Login';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Header from '../components/Header';

export type StackNavigatorPropType = NavigationProp<ParamListBase>;

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="stack.login"
      screenOptions={() => {
        return {
          header: Header,
        };
      }}>
      <Stack.Screen
        name="stack.home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="stack.login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
