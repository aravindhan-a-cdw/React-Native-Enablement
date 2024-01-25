import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Help from '../screens/Help';
import DrawerHome from '../components/DrawerHome';

const DrawerNavigation = () => {
  const routes = [
    {
      name: 'drawer-home',
      component: DrawerHome,
      label: 'Home',
    },
    {
      name: 'drawer-help',
      component: Help,
      label: 'Help',
    },
  ];
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      {routes.map(route => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{drawerLabel: route.label}}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
