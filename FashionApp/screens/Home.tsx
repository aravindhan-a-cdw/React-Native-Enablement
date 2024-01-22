import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductsSection from '../components/ProductsSection';
import {BLACK, DARK_GRAY} from '../constants/color';
// import {
//   NavigationContainer,
//   createNavigationContainerRef,
// } from '@react-navigation/native';

// const homeTabNavRef = createNavigationContainerRef();

const NavBarTab = (props: {children: React.ReactNode; focused: boolean}) => {
  // const route = homeTabNavRef.current?.getCurrentRoute();
  return (
    <Text style={props.focused ? styles.focusedTab : styles.unfocusedTab}>
      {props.children}
    </Text>
  );
};

export type HomeTabNavigationParamsList = {
  [x: string]: {name: string};
};

const Home: React.FC = () => {
  const Tab = createMaterialTopTabNavigator();
  const tabSections = ['Man', 'Woman', 'Kids'];
  return (
    // <NavigationContainer
    // ref={homeTabNavRef}
    // independent>
    <Tab.Navigator
      initialRouteName={'Man'}
      // screenOptions={{
      //   tabBarLabelStyle: {
      //     fontSize: 18,
      //     fontWeight: '300',
      //     fontFamily: 'Poppins',
      //     textTransform: 'capitalize',
      //     // width: '100%',
      //     // backgroundColor: '#fff',
      //   },
      //   // tabBarIndicatorContainerStyle: {
      //   //   // This helps to apply styles on indicator below the tab bar
      //   //   width: '30%',
      //   // },
      //   tabBarItemStyle: {
      //     // width: '30%',
      //     // borderWidth: 1,
      //     // borderColor: 'black',
      //   },
      //   tabBarIndicatorContainerStyle: {
      //     // width: '30%',
      //   },
      //   tabBarContentContainerStyle: {
      //     // backgroundColor: 'red',
      //     // width: '100%',
      //   },
      //   // tabBarItemStyle: {
      //   //   width: '80%',
      //   //   backgroundColor: 'red',
      //   // },
      //   tabBarStyle: {
      //     backgroundColor: '#fff',
      //     elevation: 0,
      //     shadowOpacity: 0,
      //     borderBottomWidth: 1,
      //     borderBottomColor: '#e8e8e8',
      //     // width: '30%', // This modifies the width of the tab bar
      //   },
      //   tabBarIndicatorStyle: {
      //     backgroundColor: '#000',
      //     height: 3,
      //   },
      // }}
      screenOptions={{
        tabBarLabel: NavBarTab,
        tabBarAllowFontScaling: true,
        tabBarIndicatorStyle: styles.tabBarIndicator,
      }}>
      {tabSections.map((section, index) => {
        return (
          <Tab.Screen key={index} name={section} component={ProductsSection} />
        );
      })}
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  focusedTab: {
    color: BLACK,
    fontWeight: '500',
    fontSize: 18,
  },
  unfocusedTab: {
    color: DARK_GRAY,
    fontWeight: '400',
    fontSize: 18,
  },
  tabBarIndicator: {
    backgroundColor: BLACK,
    height: 4,
  },
});

export default Home;
