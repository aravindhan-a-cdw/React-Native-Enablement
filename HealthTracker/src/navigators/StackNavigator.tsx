import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/StackedScreens/Home';
import Login from '../screens/StackedScreens/Login';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Article from '../screens/StackedScreens/Article';
import CalendarScreen from '../screens/StackedScreens/Calendar';
import {useDispatch} from 'react-redux';
import {loadData} from '../stores/slices/data';

export type StackNavigatorPropType = NavigationProp<ParamListBase>;

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Stack Navigator Loaded');
    dispatch(loadData());
  }, [dispatch]);

  return (
    <Stack.Navigator
      // key={'stack'}
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
        options={{title: 'Calendar', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
