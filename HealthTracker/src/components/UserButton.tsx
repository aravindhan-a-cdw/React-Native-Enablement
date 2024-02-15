import React, {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  colors,
  paddingStyles,
  containerStyles,
  borderStyles,
  fontStyles,
} from '../styles/common';

type UserButtonProps = PropsWithChildren<TouchableOpacityProps> & {
  type: keyof typeof buttonTypeStyles;
  children: string;
};

const UserButton = (props: UserButtonProps) => {
  const {type, style, children} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[
        commonStyles.common,
        buttonTypeStyles[type],
        style,
        props.disabled ? commonStyles.disabled : {},
      ]}>
      <Text style={[buttonTextStyles.primary]}>{children}</Text>
    </TouchableOpacity>
  );
};

const commonStyles = StyleSheet.create({
  common: {
    ...paddingStyles.buttonInput,
    // ...widthStyles.full,
    ...containerStyles.centeredContainer,
    ...paddingStyles.buttonInput,
    ...borderStyles.buttonInputBorderRadius,
    // flex: 1,
    height: 50,
  },
  disabled: {
    backgroundColor: colors.disabledButtonColor,
  },
});

const buttonTypeStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primaryColor,
    color: colors.white,
  },
  secondary: {
    backgroundColor: colors.secondaryColor,
  },
});

const buttonTextStyles = StyleSheet.create({
  primary: {
    color: colors.white,
    ...fontStyles.medium,
    fontWeight: '500',
  },
});

export default UserButton;
