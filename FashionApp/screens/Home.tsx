import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import ProductsSection from '../components/ProductsSection';

// const TextComp = (props: any) => {
//   console.log(props.route.name);
//   // console.log(props.navigation)
//   return (
//     <View>
//       <Text>{props.name || 'Hello'}</Text>
//     </View>
//   );
// };

const NavBarTab = (props: any) => {
  return (
    <Text
      style={{
        color: props.focused ? '#000' : '#666',
        fontWeight: props.focused ? '500' : '400',
        fontSize: 18,
      }}>
      {props.route.name}
    </Text>
  );
};
const Home: React.FC = () => {
  const Tab = createMaterialTopTabNavigator();
  const tabSections = ['Man', 'Woman', 'Kids'];
  return (
    // <View>
    <Tab.Navigator
      initialRouteName="Man"
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
      screenOptions={({route}) => ({
        tabBarLabel: props => {
          return <NavBarTab route={route} {...props} />;
        },
        tabBarAllowFontScaling: true,
        tabBarIndicatorStyle: {
          backgroundColor: '#000',
          height: 4,
        },
      })}>
      {tabSections.map((section, index) => {
        return (
          <Tab.Screen key={index} name={section} component={ProductsSection} />
        );
      })}
    </Tab.Navigator>
    // </View>
  );
};

export default Home;
