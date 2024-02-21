import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart, lineDataItem, ruleTypes} from 'react-native-gifted-charts';
import {colors, paddingStyles} from '../styles/common';

type Props = {
  data1: Array<lineDataItem>;
  data2?: Array<lineDataItem>;
};

const StatusChart = (props: Props) => {
  const {data1, data2} = props;
  const width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <LineChart
        width={width * 0.7}
        curveType={1}
        data={data1}
        data2={data2}
        curved
        isAnimated
        scrollToEnd
        rotateLabel
        noOfSections={5}
        stepValue={2000}
        thickness1={4}
        thickness={4}
        color1={colors.progressIndicator.steps}
        color2={colors.progressIndicator.water}
        // yAxisColor={'black'}
        // yAxisTextStyle={{
        //   fontSize: 12,
        //   color: colors.black,
        //   transform: [{rotate: '-30deg'}],
        // }}
        hideYAxisText
        rulesType={ruleTypes.SOLID}
        rulesThickness={1}
        rulesColor={colors.lightGray}
        xAxisType={ruleTypes.SOLID}
        xAxisColor={'transparent'}
        xAxisLabelsHeight={0}
        yAxisThickness={0}
        lineGradient
        lineGradientDirection="vertical"
        lineGradientEndColor="yellow"
        lineGradientStartColor="green"
        // showYAxisIndices
        // showXAxisIndices
        xAxisLabelTextStyle={{fontSize: 12, color: colors.black}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '90%',
    paddingTop: paddingStyles.medium.padding,
    // borderWidth: 1,
    // borderColor: colors.black,
  },
});

export default StatusChart;
