import {StyleSheet} from 'react-native';

export const containerStyles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontallyCenteredContainer: {
    alignItems: 'center',
  },
  verticallyCenteredContainer: {
    justifyContent: 'center',
  },
});

export const paddingStyles = StyleSheet.create({
  small: {
    padding: 10,
  },
  medium: {
    padding: 20,
  },
  large: {
    padding: 30,
  },
  buttonInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export const borderStyles = StyleSheet.create({
  buttonInputBorder: {
    borderWidth: 1,
  },
  buttonInputBorderRadius: {
    borderRadius: 25,
  },
});

export const marginStyles = StyleSheet.create({
  small: {
    margin: 10,
  },
  medium: {
    margin: 20,
  },
  large: {
    margin: 30,
  },
});

export const heightStyles = StyleSheet.create({
  small: {
    height: 20,
  },
  medium: {
    height: 30,
  },
  large: {
    height: 50,
  },
});

export const widthStyles = StyleSheet.create({
  small: {
    width: 20,
  },
  medium: {
    width: 30,
  },
  large: {
    width: 40,
  },
  full: {
    width: '100%',
  },
});

export const fontStyles = StyleSheet.create({
  small: {
    fontSize: 12,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 20,
  },
  extraLarge: {
    fontSize: 24,
  },
  extraExtraLarge: {
    fontSize: 30,
  },
});

export const colors = {
  borderColor: '#eee',
  inputTextColor: '#000',
  placeholderTextColor: '#333',
  black: '#000',
  white: '#fff',
  gray: '#333',
  primaryButtonColor: '#83AC77',
  disabledButtonColor: '#ccc',
};

export const textStyles = StyleSheet.create({
  title: {
    ...fontStyles.extraExtraLarge,
    fontWeight: 'bold',
    color: colors.black,
  },
  subtitle: {
    ...fontStyles.medium,
    color: colors.gray,
  },
});
