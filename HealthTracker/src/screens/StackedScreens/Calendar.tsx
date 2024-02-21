import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {
  colors,
  containerStyles,
  marginStyles,
  paddingStyles,
} from '../../styles/common';
import {CalendarList, DateData} from 'react-native-calendars';
import BottomSheet from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {selectAllDailyData, selectWeeklyGoals} from '../../stores/slices/data';
import FootImage from '../../assets/foot-sign.svg';
import WaterImage from '../../assets/water.svg';
import {calculateColor} from '../../utils/color';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const dailyData = useSelector(selectAllDailyData);
  const weeklyGoals = useSelector(selectWeeklyGoals);
  const selectedDayData = dailyData[selectedDate] || {water: 0, steps: 0};

  const dailyDataKeys = Object.keys(dailyData);
  dailyDataKeys
    .sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    })
    .reverse();

  const startDate = dailyDataKeys[0];

  const pastScrollRange = Math.round(
    Math.abs(
      (new Date(startDate).getTime() - new Date().getTime()) /
        1000 /
        60 /
        60 /
        24 /
        30,
    ),
  );
  const width = Dimensions.get('window').width;

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['54%', '98%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const marked = useMemo(() => {
    const averageSteps = weeklyGoals.steps / 7;
    const averageWater = weeklyGoals.water / 7;

    const entries = dailyDataKeys.map(date => {
      const data = dailyData[date];

      const completionPercentage =
        (data.steps / averageSteps + data.water / averageWater) / 2;

      const color = calculateColor(completionPercentage);

      return [
        date,
        {
          startingDay: new Date(date).getDay() === 0,
          color: color,
          endingDay: new Date(date).getDay() === 6,
        },
      ];
    });
    return Object.fromEntries(entries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyData, weeklyGoals]);

  const styles = StyleSheet.create({
    calendarContainer: {
      width: width,
      zIndex: -1,
    },
    bottomSheetStyle: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: colors.lightGray,
      borderWidth: 5,
      margin: 5,
      elevation: 5,
      shadowColor: colors.black,
    },
  });

  const dayPressHandler = (day: DateData) => {
    bottomSheetRef.current?.snapToIndex(0);
    setSelectedDate(day.dateString);
  };

  return (
    <View style={containerStyles.fullScreenHorizontallyCenteredWhiteContainer}>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={styles.bottomSheetStyle}
        onChange={handleSheetChanges}>
        <View style={[containerStyles.horizontallyCenteredContainer]}>
          <Text style={bottomSheetContentStyles.title}>
            View data for {selectedDate}
          </Text>
          <View style={bottomSheetContentStyles.infoContainer}>
            <View style={bottomSheetContentStyles.dataContainer}>
              <FootImage width={50} height={50} />
              <Text style={bottomSheetContentStyles.subtitle}>
                Steps Walked -{' '}
                <Text style={bottomSheetContentStyles.numberInfo}>
                  {selectedDayData.steps}
                </Text>
              </Text>
            </View>
            <View style={bottomSheetContentStyles.dataContainer}>
              <WaterImage width={50} height={50} />
              <Text style={bottomSheetContentStyles.subtitle}>
                Water Consumed -{' '}
                <Text style={bottomSheetContentStyles.numberInfo}>
                  {selectedDayData.water} ml
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </BottomSheet>
      <View style={styles.calendarContainer}>
        <CalendarList
          maxDate={new Date().toDateString()}
          minDate={startDate.toString()}
          allowSelectionOutOfRange={false}
          disableAllTouchEventsForDisabledDays={true}
          onDayPress={dayPressHandler}
          theme={{
            selectedDayBackgroundColor: 'orange',
            selectedDayTextColor: 'white',
            selectedDotColor: 'white',
          }}
          markingType="period"
          markedDates={marked}
          pastScrollRange={pastScrollRange}
          futureScrollRange={1}
          horizontal
        />
      </View>
    </View>
  );
};

const bottomSheetContentStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
    marginVertical: marginStyles.large.margin,
  },
  subtitle: {
    fontSize: 16,
    color: colors.black,
    marginVertical: marginStyles.small.margin,
  },
  numberInfo: {fontSize: 20, color: colors.black, fontWeight: 'bold'},
  infoContainer: {
    justifyContent: 'space-between',
    borderColor: colors.lightGray,
    borderWidth: 2,
    width: '90%',
    borderRadius: 25,
    ...paddingStyles.large,
  },
  dataContainer: {
    alignItems: 'center',
  },
});

export default CalendarScreen;
