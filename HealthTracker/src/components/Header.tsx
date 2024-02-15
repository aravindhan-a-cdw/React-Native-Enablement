import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors, paddingStyles} from '../styles/common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {openDrawer} from '../stores/slices/appState';
import {useNavigation} from '@react-navigation/native';
import {StackNavigatorPropType} from '../navigators/StackNavigator';

const Header = () => {
  const navigation = useNavigation<StackNavigatorPropType>();

  const dispatch = useDispatch(); // This creates a warning about order of hooks called

  const sideDrawerOpenHandler = () => {
    console.log('Open Drawer');
    dispatch(openDrawer());
  };

  const calendarPressHandler = () => {
    console.log('Calendar Pressed');
    navigation.navigate('stack.calendar');
  };

  const notificationPressHandler = () => {
    console.log('Notification Pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <TouchableOpacity onPress={sideDrawerOpenHandler}>
        <FAIcon name="bars-staggered" size={20} color="black" />
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={calendarPressHandler}>
          <IonIcon name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={notificationPressHandler}>
          <IonIcon name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
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
