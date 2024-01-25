import React from 'react';
import TabNavigation from '../navigations/TabNavigation';

export type HomeTabNavigationParamsList = {
  [x: string]: {name: string};
};

const HomePage: React.FC = () => {
  return <TabNavigation />;
};

export default HomePage;
