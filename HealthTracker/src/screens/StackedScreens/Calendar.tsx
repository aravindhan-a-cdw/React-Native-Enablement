import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {colors, containerStyles, marginStyles} from '../../styles/common';
import {CalendarList, DateData} from 'react-native-calendars';
import BottomSheet from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {selectAllDailyData} from '../../stores/slices/data';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const dailyData = useSelector(selectAllDailyData);
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
  const snapPoints = useMemo(() => ['98%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const marked = useMemo(() => {
    const entries = dailyDataKeys.map(date => {
      return [
        date,
        {
          startingDay: new Date(date).getDay() === 0,
          color: 'orange',
          endingDay: new Date(date).getDay() === 6,
        },
      ];
    });
    return Object.fromEntries(entries);
  }, [dailyDataKeys]);

  const styles = StyleSheet.create({
    calendarContainer: {
      width: width,
      zIndex: -1,
    },
    bottomSheetStyle: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: colors.gray,
      borderWidth: 2,
    },
  });

  const dayPressHandler = (day: DateData) => {
    bottomSheetRef.current?.expand();
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
          <Text style={bottomSheetContentStyles.subtitle}>
            Steps Walked: {dailyData[selectedDate].steps}
          </Text>
          <Text style={bottomSheetContentStyles.subtitle}>
            Water Consumed: {dailyData[selectedDate].water} ml
          </Text>
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
});

export default CalendarScreen;
