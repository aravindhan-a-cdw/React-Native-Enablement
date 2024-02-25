import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {signOut, updateUserProfile} from '../../services/auth';
import {
  colors,
  containerStyles,
  marginStyles,
  paddingStyles,
  widthStyles,
} from '../../styles/common';
import {StackNavigatorPropType} from '../../navigators/StackNavigator';
import UserButton from '../../components/UserButton';
import UserInput from '../../components/UserInput';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout, selectUser} from '../../stores/slices/auth';
import {
  resetAppState,
  startLoading,
  stopLoading,
} from '../../stores/slices/appState';
import {ProfileConstants} from '../../constants/pageConstants';

type Props = {
  navigation: StackNavigatorPropType;
  viewOnly?: boolean;
};

const Profile = (props: Props) => {
  const {viewOnly = false} = props;

  const user = useSelector(selectUser);
  const [name, setName] = React.useState(user?.name || '');
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.debug('Logout pressed');
    await signOut();
    dispatch(logout());
    dispatch(resetAppState());

    props.navigation.reset({
      index: 0,
      routes: [{name: 'stack.login'}],
    });
  };

  const handleUpdateProfile = async () => {
    console.debug('Updating user Profile');
    if (name.trim() === '') {
      Alert.alert('Error', 'Name cannot be empty', [{text: 'My Bad!'}], {
        onDismiss: () => setName(user?.name || ''),
        cancelable: true,
      });
      return;
    }
    dispatch(startLoading());
    await updateUserProfile(name);
    dispatch(login({name, email: user?.email || '', uid: user?.uid || ''}));
    dispatch(stopLoading());
  };

  if (viewOnly) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/profile.jpg')}
          />
          <Text style={styles.text}>{user?.name}</Text>
          <Text style={styles.text}>{user?.email}</Text>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>{ProfileConstants.LOGOUT}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{ProfileConstants.TITLE}</Text>
      <Image
        style={styles.profileImage}
        source={require('../../assets/profile.jpg')}
      />
      <UserInput
        editable={!viewOnly}
        value={name}
        onChangeText={setName}
        type="primary"
        placeholder={ProfileConstants.PLACEHOLDERS.NAME}
      />
      <UserInput
        editable={false}
        value={user?.email}
        type="primary"
        placeholder={ProfileConstants.PLACEHOLDERS.EMAIL}
      />

      <View style={[containerStyles.rowContainer, styles.buttonContainer]}>
        <UserButton
          style={[widthStyles.basis_50]}
          type="primary"
          onPress={handleUpdateProfile}>
          {ProfileConstants.SAVE}
        </UserButton>

        <UserButton
          style={[widthStyles.basis_50]}
          type="secondary"
          onPress={handleLogout}>
          {ProfileConstants.LOGOUT}
        </UserButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    ...paddingStyles.medium,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: marginStyles.small.margin,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: marginStyles.small.margin,
  },
  logout: {
    backgroundColor: colors.secondaryColor,
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
  buttonContainer: {
    gap: 20,
    ...paddingStyles.medium,
  },
});

export default Profile;
