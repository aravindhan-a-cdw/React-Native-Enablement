// src/navigation/MyStack.js

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home'; // Replace with your actual screen components
import Camera from '../screens/Camera';
import LocationScreen from '../screens/Location';
import LocalStorage from '../screens/LocalStorage';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="LocalStorage" component={LocalStorage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
