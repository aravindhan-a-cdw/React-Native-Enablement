import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Header from './Header';

const TabNav = () => {
  const routes = [
    {
      name: 'home',
      component: Home,
    },
  ];
  const BottomTab = createBottomTabNavigator();
  return (
    <NavigationContainer independent>
      <BottomTab.Navigator
        screenOptions={{
          header: Header,
        }}>
        {routes.map((route, index) => (
          <BottomTab.Screen
            key={index}
            name={route.name}
            component={route.component}
            initialParams={{type: 'primary'}}
          />
        ))}
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default TabNav;
