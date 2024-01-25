import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import HomePage from '../components/HomePage';

const BottomTab = () => <Text>Bottom</Text>;

const BottomTabNavigation = () => {
  const BottomNav = createBottomTabNavigator();
  return (
    <BottomNav.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Settings">
      <BottomNav.Screen name="Main" component={HomePage} />
      <BottomNav.Screen name="Settings" component={BottomTab} />
    </BottomNav.Navigator>
  );
};

export default BottomTabNavigation;
