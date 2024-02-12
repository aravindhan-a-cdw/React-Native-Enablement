import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ColoredContainer from './ColoredContainer';
import {colors, containerStyles, paddingStyles} from '../styles/common';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const WeeklyProgress = () => {
  const [progress, _] = React.useState(65);
  return (
    <View style={styles.container}>
      <ColoredContainer
        backgroundColor={colors.progressIndicator.weeklyProgressBackground}
        iconPosition="right"
        icon={
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={progress}
            fillLineCap="round"
            rotation={30}
            duration={2000}
            delay={500}
            tintColor="#fff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#A8B1FF"
            children={prop => {
              return (
                <View
                  style={[
                    containerStyles.centeredContainer,
                    containerStyles.rowContainer,
                  ]}>
                  <Text style={styles.title}>{Math.round(prop)}</Text>
                  <Text style={styles.percentage}>%</Text>
                </View>
              );
            }}
          />
        }>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Your Weekly{'\n'}Progress</Text>
          <Text style={styles.subtitle}>Your weekly report</Text>
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
    color: colors.white,
    fontWeight: '600',
    fontSize: 32,
    textAlign: 'left',
  },
  subtitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'left',
  },
  percentage: {
    color: colors.white,
    fontSize: 16,
    alignSelf: 'flex-end',
    transform: [{translateY: -5}],
  },
});

export default WeeklyProgress;
