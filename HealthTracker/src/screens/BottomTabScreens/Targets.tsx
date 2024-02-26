import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, marginStyles} from '../../styles/common';
import CircularSlider from '../../components/CircularSlider';
import {useDispatch, useSelector} from 'react-redux';
import {selectWeeklyGoals, setWeeklyGoals} from '../../stores/slices/data';
import {TargetConstants} from '../../constants/pageConstants';

const Targets = () => {
  const weeklyGoals = useSelector(selectWeeklyGoals);
  const STEP_CONST = 300;
  const WATER_CONST = 150;

  const [steps, setSteps] = useState<number>(weeklyGoals.steps);
  const [water, setWater] = useState<number>(weeklyGoals.water);

  const computedSteps = steps * STEP_CONST;
  const computedWater = water * WATER_CONST;

  const dispatch = useDispatch();

  const updateSteps = (x: number) => {
    setSteps(x);
    return x * STEP_CONST;
  };

  const updateWater = (x: number) => {
    setWater(x);
    return x * WATER_CONST;
  };

  const updateWeeklyGoals = useCallback(() => {
    dispatch(setWeeklyGoals({steps: steps, water: water}));
  }, [dispatch, steps, water]);

  useEffect(() => {
    return () => {
      updateWeeklyGoals();
    };
  }, [updateWeeklyGoals]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>{TargetConstants.WEEKLY_GOALS}</Text>
          <View>
            <CircularSlider
              btnRadius={20}
              dialRadius={100}
              min={10}
              meterColor={colors.progressIndicator.steps}
              dialWidth={8}
              value={steps}
              onValueChange={updateSteps}>
              {TargetConstants.STEPS + ': ' + computedSteps.toString()}
            </CircularSlider>
          </View>
          <View>
            <CircularSlider
              btnRadius={20}
              dialRadius={100}
              value={water}
              meterColor={colors.progressIndicator.water}
              dialWidth={8}
              min={50}
              onValueChange={updateWater}>
              {TargetConstants.WATER + ': ' + computedWater.toString() + ' ml'}
            </CircularSlider>
          </View>
          <View>
            <Text style={styles.title}>{TargetConstants.DAILY_GOALS}</Text>
            <Text style={styles.text}>
              {TargetConstants.STEPS}: {Math.round(computedSteps / 7)}
            </Text>
            <Text style={styles.text}>
              {TargetConstants.WATER}: {Math.round(computedWater / 7)} ml
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: marginStyles.medium.margin,
  },
  text: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    marginBottom: marginStyles.small.margin,
  },
});

export default Targets;
