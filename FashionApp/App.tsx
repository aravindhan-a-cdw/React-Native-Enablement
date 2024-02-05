/**
 * @author Aravindhan A
 * This is the entry point of the application.
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import Cart, {CartItem} from './state/cart';
// import StackNavigation from './navigations/StackNavigation';
import DrawerNavigation from './navigations/DrawerNavigation';

const App: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  return (
    // SafeAreaView is used to avoid the notch and prevent rendering in the status bar in iPhone X and above.
    <SafeAreaView style={styles.appContainer}>
      <NavigationContainer>
        <Cart.Provider value={{cartItems: cartItems, setCartItems}}>
          <DrawerNavigation />
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
