import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, containerStyles, marginStyles} from '../../styles/common';
import StatusChart from '../../components/StatusChart';
import {WeeklyReportConstants} from '../../constants/pageConstants';

const Report = () => {
  // const stepData = [
  //   {value: 2000, label: '02-16'},
  //   {value: 3460, label: '02-17'},
  //   {value: 1856, label: '02-18'},
  //   {value: 4003, label: '02-19'},
  //   {value: 3687, label: '02-20'},
  //   {value: 6003, label: '02-21'},
  //   {value: 5456, label: '02-22'},
  //   {value: 1203, label: '02-23'},
  // ];
  // const waterData = [
  //   {value: 4000, label: '02-16'},
  //   {value: 8460, label: '02-17'},
  //   {value: 6856, label: '02-18'},
  //   {value: 5003, label: '02-19'},
  //   {value: 3687, label: '02-20'},
  //   {value: 6003, label: '02-21'},
  //   {value: 7456, label: '02-22'},
  //   {value: 5203, label: '02-23'},
  // ];

  const stepData = [
    {value: 2000, label: 'Sun'},
    {value: 3460, label: 'Mon'},
    {value: 1856, label: 'Tue'},
    {value: 4003, label: 'Wed'},
    {value: 3687, label: 'Thu'},
    {value: 6003, label: 'Fri'},
    {value: 5456, label: 'Sat'},
    {value: 1203, label: 'Sun'},
  ];
  const waterData = [
    {value: 4000, label: 'Sun'},
    {value: 8460, label: 'Mon'},
    {value: 6856, label: 'Tue'},
    {value: 5003, label: 'Wed'},
    {value: 3687, label: 'Thu'},
    {value: 6003, label: 'Fri'},
    {value: 7456, label: 'Sat'},
    {value: 5203, label: 'Sun'},
  ];

  return (
    <View
      style={[containerStyles.fullScreenHorizontallyCenteredWhiteContainer]}>
      <Text style={styles.title}>{WeeklyReportConstants.TITLE}</Text>
      <View style={styles.weeklyTotalContainer}>
        <View>
          <Text style={styles.number}>8,234</Text>
          <Text style={styles.text}>{WeeklyReportConstants.STEPS}</Text>
        </View>
        <View>
          <Text style={styles.number}>12,345 ml</Text>
          <Text style={styles.text}>{WeeklyReportConstants.WATER}</Text>
        </View>
      </View>
      <StatusChart data1={stepData} data2={waterData} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: marginStyles.large.margin,
  },
  weeklyTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  text: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
  },
});

export default Report;
