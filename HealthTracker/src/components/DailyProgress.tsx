import React, {useEffect} from 'react';
import {colors, paddingStyles} from '../styles/common';
import {View, StyleSheet} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColoredContainer from './ColoredContainer';
import {useDispatch, useSelector} from 'react-redux';
import {addSteps, selectDailyData} from '../stores/slices/data';

const DailyProgress = () => {
  // This component is used to display daily progress of user
  const date = new Date().toISOString().split('T')[0];

  const dailyData = useSelector(selectDailyData(date)) || {water: 0, steps: 0};
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dailyData) {
      dispatch(addSteps({data: 0}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        title="ml Water"
        value={dailyData.water.toString()}
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
        value={dailyData.steps.toString()}
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
    flexBasis: '50%',
    padding: paddingStyles.medium.padding,
  },
});

export default DailyProgress;
