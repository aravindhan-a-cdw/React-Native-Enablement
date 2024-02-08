import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
import {signIn} from '../../services/auth';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../stores/slices/loader';

type LoginProps = {
  navigation: StackNavigatorPropType;
};

const Login = (props: LoginProps) => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // Hide the header
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  const handleLogin = () => {
    const login = async () => {
      dispatch(startLoading());
      await signIn(email, password);
    };
    login()
      .then(() => {
        dispatch(stopLoading());
        navigation.navigate('stack.home');
      })
      .catch(err => {
        console.log(err.code);
        switch (err.code) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'Invalid credentials');
            break;
        }
        dispatch(stopLoading());
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.mainHeader}>Yippy! You're Back!</Text>
        <Text style={textStyles.subtitle}>We are happy to see you back</Text>
      </View>
      <UserInput
        type="primary"
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <UserInput
        type="primary"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
      <UserButton
        disabled={email && password ? false : true}
        onPress={handleLogin}
        type="primary">
        Log In
      </UserButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    ...textStyles.title,
  },
  container: {
    ...containerStyles.horizontallyCenteredContainer,
    ...paddingStyles.medium,
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
