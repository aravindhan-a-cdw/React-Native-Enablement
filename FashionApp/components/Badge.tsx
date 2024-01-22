import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import {ORANGE_BACKGROUND, WHITE} from '../constants/color';

const Badge: React.FC<{
  data: React.ReactNode;
  style?: StyleProp<TextStyle>;
}> = props => {
  const badgeStyles = StyleSheet.compose(styles.badgeText, props.style);
  return <Text style={badgeStyles}>{props.data}</Text>;
};

const styles = StyleSheet.create({
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: WHITE,
    paddingHorizontal: 4,
    borderRadius: 100,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: ORANGE_BACKGROUND,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    position: 'absolute',
    fontFamily: 'Poppins',
    top: -4,
    right: 0,
  },
});

export default Badge;
