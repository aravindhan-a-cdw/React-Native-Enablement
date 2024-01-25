import React from 'react';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Header from '../components/Header';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';

type RouterParams = {
  stack_home: {type: string};
  product: {type: string};
};

type Route = {
  name: keyof RouterParams;
  component: React.ComponentType;
};

const StackNavigation = () => {
  const Stack = createStackNavigator<RouterParams>();
  const headerComponent = (props: StackHeaderProps) => <Header {...props} />;
  const routes: Route[] = [
    {
      name: 'stack_home',
      component: Home,
    },
    {
      name: 'product',
      component: ProductDetail,
    },
  ];
  return (
    <Stack.Navigator
      screenOptions={{header: headerComponent}}
      initialRouteName={routes[0].name}>
      {routes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
          initialParams={{type: 'primary'}}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
