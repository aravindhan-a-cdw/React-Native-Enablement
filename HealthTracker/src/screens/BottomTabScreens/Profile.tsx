import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {signOut} from '../../services/auth';
import {colors} from '../../styles/common';
import {StackNavigatorPropType} from '../../navigators/StackNavigator';

type Props = {
  navigation: StackNavigatorPropType;
};

const Profile = (props: Props) => {
  const handleLogout = async () => {
    console.log('Logout');
    await signOut();
    props.navigation.navigate('stack.login');
  };
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logout: {
    backgroundColor: colors.primaryColor,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
