import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {signOut} from '../../services/auth';
import {colors, marginStyles, paddingStyles} from '../../styles/common';
import {StackNavigatorPropType} from '../../navigators/StackNavigator';
import UserButton from '../../components/UserButton';
import UserInput from '../../components/UserInput';
import {useSelector} from 'react-redux';
import {selectUser} from '../../stores/slices/auth';

type Props = {
  navigation: StackNavigatorPropType;
  viewOnly: boolean;
};

const Profile = (props: Props) => {
  const user = useSelector(selectUser);
  const {viewOnly = false} = props;

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
      <UserInput
        editable={!viewOnly}
        value={user?.name}
        type="primary"
        placeholder="Name"
      />
      <UserInput
        editable={!viewOnly}
        value={user?.email}
        type="primary"
        placeholder="Email"
      />
      {!viewOnly && (
        <UserButton type="primary" onPress={handleLogout}>
          Save
        </UserButton>
      )}
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
    width: 120,
    height: 120,
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
