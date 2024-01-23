import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import {ORANGE_BACKGROUND, WHITE} from '../constants/color';

const Badge: React.FC<{
  data: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}> = props => {
  const badgeStyles = StyleSheet.compose(styles.badgeText, props.style);

  return (
    <View>
      {props.children}
      <Text style={badgeStyles}>{props.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: WHITE,
    paddingHorizontal: 4,
    borderRadius: 8,
    height: 16,
    width: 16,
    overflow: 'hidden',
    backgroundColor: ORANGE_BACKGROUND,
    position: 'absolute',
    fontFamily: 'Poppins',
    top: -4,
    right: 0,
  },
});

export default Badge;
