import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, marginStyles} from '../../styles/common';
import CircularSlider from '../../components/CircularSlider';

const Targets = () => {
  const [steps, setSteps] = useState<number>(10);
  const [water, setWater] = useState<number>(100);

  const updateSteps = (x: number) => {
    setSteps(x * 100);
    return x * 100;
  };

  const updateWater = (x: number) => {
    setWater(x * 10);
    return x * 10;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Your Weekly Goals</Text>
          <View>
            <CircularSlider
              btnRadius={20}
              dialRadius={100}
              min={10}
              meterColor={colors.progressIndicator.steps}
              dialWidth={8}
              value={steps}
              onValueChange={updateSteps}>
              {'Steps: ' + steps.toString()}
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
              {'Water: ' + water.toString() + ' ml'}
            </CircularSlider>
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
});

export default Targets;
