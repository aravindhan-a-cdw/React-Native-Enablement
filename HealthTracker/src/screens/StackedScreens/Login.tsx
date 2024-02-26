import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import UserInput from '../../components/UserInput';
import {StackNavigatorPropType} from '../../navigators/StackNavigator';
import {
  colors,
  containerStyles,
  fontStyles,
  paddingStyles,
  textStyles,
} from '../../styles/common';
import UserButton from '../../components/UserButton';
import {getCurrentUser, signIn} from '../../services/auth';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../stores/slices/appState';
import {login} from '../../stores/slices/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {LoginConstants} from '../../constants/pageConstants';

type LoginProps = {
  navigation: StackNavigatorPropType;
};

const Login = (props: LoginProps) => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{name: 'stack.home'}],
      });
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email?.split('@')[0],
        }),
      );
    }

    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  const handleLogin = () => {
    const loginProcess = async () => {
      dispatch(startLoading());
      return await signIn(email, password);
    };
    loginProcess()
      .then((data: FirebaseAuthTypes.UserCredential) => {
        dispatch(stopLoading());
        navigation.navigate('stack.home');
        dispatch(
          login({
            uid: data.user?.uid,
            name: data.user?.displayName || data.user?.email?.split('@')[0],
            email: data.user?.email,
          }),
        );
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'Invalid credentials');
            break;
        }
        dispatch(stopLoading());
      });
  };

  return (
    <View
      style={[containerStyles.fullScreenHorizontallyCenteredWhiteContainer]}>
      <View
        style={[
          containerStyles.fullScreenHorizontallyCenteredWhiteContainer,
          styles.container,
        ]}>
        <View style={styles.textContainer}>
          <Text style={styles.mainHeader}>{LoginConstants.WELCOME_TITLE}</Text>
          <Text style={textStyles.subtitle}>
            {LoginConstants.WELCOME_SUBTITLE}
          </Text>
        </View>
        <UserInput
          type="primary"
          autoCapitalize={'none'}
          autoFocus={true}
          autoComplete={'off'}
          keyboardType="email-address"
          placeholder={LoginConstants.EMAIL}
          value={email}
          onChangeText={setEmail}
        />
        <UserInput
          type="primary"
          autoCapitalize="none"
          autoComplete={'off'}
          value={password}
          onChangeText={setPassword}
          placeholder={LoginConstants.PASSWORD}
          secureTextEntry={true}
        />
        <Text style={styles.forgotPassword}>
          {LoginConstants.FORGOT_PASSWORD}
        </Text>
        <UserButton
          disabled={email && password ? false : true}
          onPress={handleLogin}
          type="primary">
          {LoginConstants.LOGIN}
        </UserButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    ...textStyles.title,
  },
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: colors.white,
    gap: 20,
  },
  textContainer: {
    ...containerStyles.horizontallyCenteredContainer,
    ...paddingStyles.small,
    gap: 5,
  },
  forgotPassword: {
    ...fontStyles.small,
    color: colors.black,
    alignSelf: 'flex-end',
    ...paddingStyles.small,
  },
});

export default Login;
