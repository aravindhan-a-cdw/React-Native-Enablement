import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {
  colors,
  heightStyles,
  paddingStyles,
  widthStyles,
  borderStyles,
} from '../styles/common';

type UserInputProps = TextInputProps & {
  type: keyof typeof styles;
};

const UserInput = (props: UserInputProps) => {
  const {type, style} = props;
  return (
    <TextInput
      style={[inputStyles.common, styles[type], style]}
      {...props}
      placeholderTextColor={colors.placeholderTextColor}
    />
  );
};

const inputStyles = StyleSheet.create({
  common: {
    ...heightStyles.large,
    ...widthStyles.full,
    borderColor: colors.borderColor,
    color: colors.black,
    ...paddingStyles.buttonInput,
    ...borderStyles.buttonInputBorder,
    ...borderStyles.buttonInputBorderRadius,
  },
});

const styles = StyleSheet.create({
  primary: {},
});

export default UserInput;
