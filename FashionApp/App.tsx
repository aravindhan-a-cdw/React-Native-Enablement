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
import {StatusBar} from 'react-native';
import Cart, {CartItem} from './state/cart';
import {WHITE} from './constants/color';

const App: React.FC = () => {
  const Stack = createStackNavigator();
  const headerComponent = (props: StackHeaderProps) => <Header {...props} />;
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  return (
    <NavigationContainer>
      <Cart.Provider value={{cartItems: cartItems, setCartItems}}>
        <StatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{header: headerComponent}}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="product" component={ProductDetail} />
        </Stack.Navigator>
      </Cart.Provider>
    </NavigationContainer>
  );
};

export default App;
