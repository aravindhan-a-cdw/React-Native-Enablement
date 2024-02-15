import React, {useCallback, useMemo, useRef} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {containerStyles} from '../../styles/common';
import {CalendarList, DateData} from 'react-native-calendars';
import BottomSheet from '@gorhom/bottom-sheet';

// const initialDate = '2024-02-01';
// const nextWeekDate = '2024-02-08';
// const nextWeekEndDate = '2024-02-15';
// const nextMonthDate = '2022-08-05';

const CalendarScreen = () => {
  const startDate = new Date();
  startDate.setDate(new Date().getDate() - 30);

  const pastScrollRange = Math.round(
    Math.abs(
      (startDate.getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24 / 30,
    ),
  );
  console.log(pastScrollRange);
  const width = Dimensions.get('window').width;

  // const [selected, setSelected] = useState(initialDate);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['98%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // const marked = useMemo(() => {
  //   return {
  //     [nextWeekDate]: {
  //       startingDay: true,
  //       color: 'green',
  //       periods: [],
  //     },
  //     [nextWeekEndDate]: {
  //       endingDay: true,
  //       color: 'green',
  //     },
  //     [nextMonthDate]: {
  //       selected: selected === nextMonthDate,
  //       selectedTextColor: '#5E60CE',
  //       marked: true,
  //     },
  //     [selected]: {
  //       selected: true,
  //       disableTouchEvent: true,
  //       selectedColor: '#5E60CE',
  //       selectedTextColor: 'white',
  //     },
  //   };
  // }, [selected]);

  const styles = StyleSheet.create({
    calendarContainer: {
      width: width,
      zIndex: -1,
    },
    bottomSheetStyle: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: 'black',
      borderWidth: 2,
    },
  });

  const dayPressHandler = (day: DateData) => {
    bottomSheetRef.current?.expand();
    console.log(day);
    // setSelected(day.dateString);
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
          <Text>Awesome 🎉</Text>
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
          //   markedDates={marked}
          markedDates={{
            '2024-02-22': {startingDay: true, color: 'lightblue'},
            '2024-02-23': {selected: true, color: 'lightblue'},
            '2024-02-24': {selected: true, color: 'lightblue'},
            '2024-02-25': {
              selected: true,
              endingDay: true,
              color: 'lightblue',
              textColor: 'gray',
            },
          }}
          pastScrollRange={pastScrollRange}
          futureScrollRange={1}
          horizontal
          //   theme={{
          //     backgroundColor: '#ffffff',
          //     calendarBackground: '#ffffff',
          //     textSectionTitleColor: '#b6c1cd',
          //     textSectionTitleDisabledColor: '#d9e1e8',
          //     selectedDayBackgroundColor: '#00adf5',
          //     selectedDayTextColor: '#ffffff',
          //     todayTextColor: '#00adf5',
          //     dayTextColor: '#2d4150',
          //     textDisabledColor: '#d9e1e8',
          //     dotColor: '#00adf5',
          //     selectedDotColor: '#ffffff',
          //     arrowColor: 'orange',
          //     disabledArrowColor: '#d9e1e8',
          //     monthTextColor: 'blue',
          //     indicatorColor: 'blue',
          //     textDayFontFamily: 'Montserrat-Bold',
          //     textMonthFontFamily: 'Montserrat-Bold',
          //     textDayHeaderFontFamily: 'Montserrat-Bold',
          //     textDayFontWeight: '300',
          //     textMonthFontWeight: 'bold',
          //     textDayHeaderFontWeight: '300',
          //     textDayFontSize: 16,
          //     textMonthFontSize: 16,
          //     textDayHeaderFontSize: 16,
          //   }}
        />
      </View>
    </View>
  );
};

export default CalendarScreen;
