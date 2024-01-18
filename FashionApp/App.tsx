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

const App: React.FC = () => {
  const Stack = createStackNavigator();
  const headerComponent = (props: StackHeaderProps) => <Header {...props} />;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{header: headerComponent}}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="product" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
