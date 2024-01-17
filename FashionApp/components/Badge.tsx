import {StyleSheet, Text} from 'react-native';
import React from 'react';

const Badge: React.FC<{data: string}> = props => {
  return (
    // <View>
    <Text style={styles.badgeText}>{props.data}</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    paddingHorizontal: 4,
    borderRadius: 100,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: 'orange',
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
