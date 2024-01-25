import React from 'react';
import BottomTabNavigation from '../navigations/BottomTabNavigation';

export type HomeTabNavigationParamsList = {
  [x: string]: {name: string};
};

const Home: React.FC = () => {
  return (
    // This displays the tab navigator to navigate between the product sections.
    <BottomTabNavigation />
  );
};

export default Home;
