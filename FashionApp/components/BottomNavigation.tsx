import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import SvgComponent from './SvgComponent';
import TabNav from './TabNav';

const BottomNavigation = () => {
  const navItems = ['Home', 'Wishlist', 'Help', 'Profile'];
  return (
    <TabNav />
    // <View style={styles.container}>
    //   {/* <SvgComponent /> */}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: 100,
    // backgroundColor: 'transparent',
    // zIndex: 0,
    // opacity: 0,
    position: 'relative',
    bottom: '-90%',
    left: 0,
  },
  navigationStyle: {
    zIndex: 5,
    // position: 'absolute',
    top: 0,
  },
  navStyle: {
    zIndex: 5,
    position: 'absolute',
  },
});

export default BottomNavigation;
