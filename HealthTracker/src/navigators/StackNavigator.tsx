import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/StackedScreens/Home';
import Login from '../screens/StackedScreens/Login';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Article from '../screens/StackedScreens/Article';
import CalendarScreen from '../screens/StackedScreens/Calendar';
import NotificationPage from '../screens/StackedScreens/Notification';
import Report from '../screens/StackedScreens/Report';
import StepTracker from '../screens/StackedScreens/StepTracker';

export type StackNavigatorPropType = NavigationProp<ParamListBase>;

/**
 * @returns {JSX.Element} StackNavigator
 * @description This is the main stack navigator of the application
 * @param {void} No parameter
 * @version 1.0.0
 * */
const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerBackTitleVisible: false}}
      initialRouteName="stack.login">
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
      <Stack.Screen
        name="stack.article"
        component={Article}
        options={{title: 'Article', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="stack.calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="stack.notification"
        component={NotificationPage}
        options={{title: 'Notifications', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="stack.report"
        component={Report}
        options={{headerBackTitleVisible: false, headerTitle: ''}}
      />
      <Stack.Screen
        name="stack.steps"
        component={StepTracker}
        options={{headerBackTitleVisible: false, headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
