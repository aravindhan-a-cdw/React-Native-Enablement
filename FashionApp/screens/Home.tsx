import React from 'react';
import CurvedBottomNavigation from '../navigations/CurvedBottomNavigation';

export type HomeTabNavigationParamsList = {
  [x: string]: {name: string};
};

const Home: React.FC = () => {
  return (
    // This displays the tab navigator to navigate between the product sections.
    // <BottomTabNavigation />
    <CurvedBottomNavigation />
  );
};

export default Home;
