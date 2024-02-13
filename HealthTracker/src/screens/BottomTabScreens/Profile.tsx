import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {signOut} from '../../services/auth';
import {colors, marginStyles, paddingStyles} from '../../styles/common';
import {StackNavigatorPropType} from '../../navigators/StackNavigator';
import UserButton from '../../components/UserButton';
import UserInput from '../../components/UserInput';

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image
        style={styles.profileImage}
        source={require('../../assets/profile.jpg')}
      />
      <UserInput value="Aravindhan" type="primary" placeholder="Name" />
      <UserInput value="user1@cdw.com" type="primary" placeholder="Email" />
      <UserButton type="primary" onPress={handleLogout}>
        Save
      </UserButton>
      <UserButton type="secondary" onPress={handleLogout}>
        Logout
      </UserButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    ...paddingStyles.medium,
    paddingTop: 0,
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: marginStyles.small.margin,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: marginStyles.small.margin,
  },
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
