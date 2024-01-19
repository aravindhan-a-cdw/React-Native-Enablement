import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';

const Badge: React.FC<{data: string; style: StyleProp<TextStyle>}> = props => {
  const badgeStyles = StyleSheet.compose(styles.badgeText, props.style);
  return (
    // <View>
    <Text style={badgeStyles}>{props.data}</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    paddingHorizontal: 4,
    borderRadius: 100,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: '#E2801C',
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
