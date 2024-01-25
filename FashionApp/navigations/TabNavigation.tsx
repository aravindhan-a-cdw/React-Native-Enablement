import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {BLACK, DARK_GRAY} from '../constants/color';
import {StyleSheet} from 'react-native';
import ProductsSection from '../components/ProductsSection';

const TabNavigation = () => {
  const Tab = createMaterialTopTabNavigator(); // TODO: Check to apply types to this.
  const TAB_SECTIONS = ['Man', 'Woman', 'Kids'];
  return (
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

export default TabNavigation;
