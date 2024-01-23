import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductsSection from '../components/ProductsSection';
import {BLACK, DARK_GRAY} from '../constants/color';

export type HomeTabNavigationParamsList = {
  [x: string]: {name: string};
};

const Home: React.FC = () => {
  const Tab = createMaterialTopTabNavigator(); // TODO: Check to apply types to this.
  const TAB_SECTIONS = ['Man', 'Woman', 'Kids'];
  return (
    // This displays the tab navigator to navigate between the product sections.
    <Tab.Navigator
      initialRouteName={TAB_SECTIONS[0]}
      screenOptions={{
        tabBarAllowFontScaling: true,
        tabBarIndicatorStyle: styles.tabBarIndicator,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: BLACK,
        tabBarInactiveTintColor: DARK_GRAY,
      }}>
      {TAB_SECTIONS.map((section, index) => {
        return (
          <Tab.Screen key={index} name={section} component={ProductsSection} />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '400',
  },
  tabBarIndicator: {
    backgroundColor: BLACK,
    height: 4,
  },
  tabBarItem: {
    width: 100,
  },
});

export default Home;
