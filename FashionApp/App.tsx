/**
 * @author Aravindhan A
 * This is the entry point of the application.
 */

import React from 'react';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import {NavigationContainer} from '@react-navigation/native';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Header from './components/Header';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Cart, {CartItem} from './state/cart';
import {WHITE} from './constants/color';

type RouterParams = {
  home: {type: string};
  product: {type: string};
};

const App: React.FC = () => {
  const Stack = createStackNavigator<RouterParams>();
  const headerComponent = (props: StackHeaderProps) => <Header {...props} />;
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const routes = [
    {
      name: 'home',
      component: Home,
    },
    {
      name: 'product',
      component: ProductDetail,
    },
  ];

  return (
    // SafeAreaView is used to avoid the notch and prevent rendering in the status bar in iPhone X and above.
    <SafeAreaView style={styles.appContainer}>
      <NavigationContainer>
        <Cart.Provider value={{cartItems: cartItems, setCartItems}}>
          <StatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
          <Stack.Navigator
            initialRouteName={'home'}
            screenOptions={{header: headerComponent}}>
            {routes.map((route, index) => (
              <Stack.Screen
                key={index}
                name={route.name}
                component={route.component}
                initialParams={{type: 'primary'}}
              />
            ))}
          </Stack.Navigator>
        </Cart.Provider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
