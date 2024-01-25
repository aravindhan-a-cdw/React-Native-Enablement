import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
('react-native-vector-icons/MaterialCommunityIcons');
import HomePage from '../components/HomePage';
import Wishlist from '../screens/Wishlist';
import Help from '../screens/Help';
import Profile from '../screens/Profile';
import {BLACK, DARK_GRAY, WHITE} from '../constants/color';

export default function CurvedBottomNavigation() {
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';
    let name = '';

    switch (routeName) {
      case 'homepage':
        icon = 'home';
        name = 'home';
        break;
      case 'wishlist':
        icon = 'heart';
        name = 'wishlist';
        break;
      case 'help':
        icon = 'help-circle';
        name = 'help';
        break;
      case 'profile':
        icon = 'account-circle';
        name = 'profile';
        break;
    }

    return (
      <>
        <Icon
          name={icon}
          size={18}
          color={routeName === selectedTab ? 'black' : 'gray'}
        />
        <Text
          style={
            routeName === selectedTab
              ? styles.tabBarLabelActive
              : styles.tabBarLabel
          }>
          {name}
        </Text>
      </>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      screenOptions={{
        headerShown: false,
      }}
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={80}
      circleWidth={58}
      bgColor={WHITE}
      initialRouteName="homepage"
      renderCircle={({}) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => Alert.alert('Search feature is in development!')}>
            <IonIcons name={'search-sharp'} color={WHITE} size={28} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBar.Screen
        name="homepage"
        position="LEFT"
        component={HomePage}
      />
      <CurvedBottomBar.Screen
        name="wishlist"
        component={Wishlist}
        position="LEFT"
      />
      <CurvedBottomBar.Screen name="help" position="RIGHT" component={Help} />
      <CurvedBottomBar.Screen
        name="profile"
        position="RIGHT"
        component={Profile}
      />
    </CurvedBottomBar.Navigator>
  );
}

export const styles = StyleSheet.create({
  shawdow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  searchButton: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {
    // This is used to style the bottom bar, but the design is on top of the bottom bar and hence need to apply styles on the curved design
    // backgroundColor: '#f00',
  },
  btnCircleUp: {
    // This can be used to styule the circle button
    width: 56,
    height: 56,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    bottom: 15,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: 12,
    paddingTop: 5,
    color: DARK_GRAY,
    textTransform: 'capitalize',
  },
  tabBarLabelActive: {
    fontSize: 12,
    paddingTop: 5,
    color: BLACK,
    textTransform: 'capitalize',
  },
});
