import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ProductDetail from '../screens/ProductDetail';
import Header from './Header';

const TabNav = () => {
  const routes = [
    {
      name: 'home',
      component: Home,
    },
    // {
    //   name: 'product',
    //   component: ProductDetail,
    // },
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
        {/* <BottomTab.Screen name="Home" component={() => <Text>Home</Text>} />
        <BottomTab.Screen
          name="Settings"
          component={() => <Text>Settings</Text>}
        /> */}
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default TabNav;
