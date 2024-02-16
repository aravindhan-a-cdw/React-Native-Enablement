/**
 *
 * @Author: Aravindhan Asaithambi
 *
 */

import React from 'react';

import 'react-native-gesture-handler'; // Helps to setup necessary handlers for gestures
import {Provider} from 'react-redux';
import stores from './stores';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';
import Loader from './components/Loader';
import StepCalculator from './components/StepCalculator';

const App: React.FC = () => {
  return (
    <Provider store={stores}>
      <StepCalculator />
      <NavigationContainer>
        <StackNavigator />
        <Loader />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
