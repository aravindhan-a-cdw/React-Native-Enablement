import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/common';

const CheckNow = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="play-circle-outline"
        size={30}
        color={colors.progressIndicator.water}
      />
      <Text style={styles.textStyle}>Check Now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  textStyle: {
    fontWeight: '400',
    color: colors.progressIndicator.water,
  },
});

export default CheckNow;
