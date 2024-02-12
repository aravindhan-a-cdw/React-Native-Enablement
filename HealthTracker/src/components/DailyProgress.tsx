import React from 'react';
import {colors, paddingStyles} from '../styles/common';
import {View, StyleSheet} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColoredContainer from './ColoredContainer';

const DailyProgress = () => {
  return (
    <View style={dailyProgressStyles.container}>
      <ColoredContainer
        icon={
          <FAIcon
            size={20}
            color={colors.progressIndicator.water}
            name="bottle-water"
          />
        }
        title="Glass Water"
        value="50"
        backgroundColor={colors.progressIndicator.waterBackground}
        iconBackgroundColor={colors.progressIndicator.waterIconBackground}
      />
      <ColoredContainer
        icon={
          <Ionicons
            size={20}
            color={colors.progressIndicator.steps}
            name="footsteps-sharp"
          />
        }
        title="Steps Walked"
        value="500"
        backgroundColor={colors.progressIndicator.stepsBackground}
        iconBackgroundColor={colors.progressIndicator.stepsIconBackground}
      />
    </View>
  );
};

const dailyProgressStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    padding: paddingStyles.medium.padding,
  },
});

export default DailyProgress;
