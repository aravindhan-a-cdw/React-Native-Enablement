import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors, paddingStyles} from '../styles/common';

const Header = (props: any) => {
  console.log('props', props);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FAIcon name="bars-staggered" size={20} color="black" />
      <View style={styles.rightContainer}>
        <IonIcon name="calendar-outline" size={24} color="black" />
        <IonIcon name="notifications-outline" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: paddingStyles.medium.padding,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default Header;
