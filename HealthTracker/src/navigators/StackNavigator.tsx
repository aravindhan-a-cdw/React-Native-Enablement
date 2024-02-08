import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/StackedScreens/Home';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
