import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ColoredContainer from './ColoredContainer';
import {colors, paddingStyles} from '../styles/common';
import CheckNow from './CheckNow';

const Banner = () => {
  return (
    <View style={styles.container}>
      <ColoredContainer
        backgroundColor={colors.mainArticleBackground}
        icon={<></>}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Learn About {'\n'}Heartbeat.</Text>
          <CheckNow />
        </View>
      </ColoredContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: paddingStyles.medium.padding,
    paddingBottom: paddingStyles.medium.padding,
  },
  textContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default Banner;
