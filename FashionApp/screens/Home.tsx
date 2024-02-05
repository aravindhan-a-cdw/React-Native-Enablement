import React, {useEffect} from 'react';
import CurvedBottomNavigation from '../navigations/CurvedBottomNavigation';
import {StatusBar} from 'react-native';
import {WHITE} from '../constants/color';
import {useIsFocused} from '@react-navigation/native';

export type HomeTabNavigationParamsList = {
  [x: string]: {name: string};
};

const Home: React.FC = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    // This is to resets the status bar color to white when the home screen is focused from other screen.
    if (isFocused) {
      StatusBar.setBackgroundColor(WHITE);
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);

  return (
    // This displays the tab navigator to navigate between the product sections.
    <>
      <StatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
      <CurvedBottomNavigation />
    </>
  );
};

export default Home;
