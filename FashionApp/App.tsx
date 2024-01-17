/**
 * @author Aravindhan A
 * This is the entry point of the application.
 */

import React from 'react';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Header from './components/Header';

const App: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="product" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
