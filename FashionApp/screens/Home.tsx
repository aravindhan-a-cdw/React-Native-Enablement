import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
const TextComp = (props: any) => {
  return (
    <View>
      <Text>{props.name || 'Hello'}</Text>
    </View>
  );
};
const Home: React.FC = () => {
  const Tab = createMaterialTopTabNavigator();
  const tabSections = ['Man', 'Woman', 'Kids'];
  return (
    // <View>
    <Tab.Navigator
      initialRouteName="Man"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
          fontFamily: 'Poppins',
          textTransform: 'capitalize',
        },
        tabBarStyle: {
          backgroundColor: 'inherit',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#e8e8e8',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#000',
          height: 3,
        },
      }}>
      {tabSections.map((section, index) => {
        return <Tab.Screen key={index} name={section} component={TextComp} />;
      })}
    </Tab.Navigator>
    // </View>
  );
};

export default Home;
