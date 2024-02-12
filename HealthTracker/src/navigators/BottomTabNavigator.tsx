import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/BottomTabScreens/Home';
import {StyleSheet} from 'react-native';
import Targets from '../screens/BottomTabScreens/Targets';
import Profile from '../screens/BottomTabScreens/Profile';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/common';
import Header from '../components/Header';

// const IconRender = (props: any) => {
//   console.log(props);
//   return <AntIcon name="home" size={30} color={props.color} />;
// };

const HomeIcon = (props: any) => {
  return <AntIcon name="home" size={30} color={props.color} />;
};

const TargetIcon = (props: any) => {
  return <MaterialIcon name="target" size={30} color={props.color} />;
};

const ProfileIcon = (props: any) => {
  return <AntIcon name="user" size={30} color={props.color} />;
};

const AddIcon = () => {
  return (
    <AntIcon
      name="plus"
      size={20}
      color={colors.white}
      style={styles.addIconStyle}
    />
  );
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={() => {
        // console.log('props', props.route);
        return {
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          headerShadowVisible: false,
          header: Header,
          //   tabBarIcon: tabProps => {
          //     return <IconRender name={props.route.name} {...tabProps} />;
          //   },
        };
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{tabBarIcon: HomeIcon}}
      />
      <Tab.Screen
        name="Targets"
        component={Targets}
        options={{tabBarIcon: TargetIcon}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarIcon: ProfileIcon}}
      />
      {/* TODO: Modify icon to have add icon and prevent pressing on it */}
      <Tab.Screen name="Add" component={Home} options={{tabBarIcon: AddIcon}} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.bottomTapBackgroundColor,
    height: '7%',
  },

  addIconStyle: {
    borderRadius: 20,
    backgroundColor: colors.primaryColor,
    padding: 8,
  },
});

export default BottomTabNavigator;
