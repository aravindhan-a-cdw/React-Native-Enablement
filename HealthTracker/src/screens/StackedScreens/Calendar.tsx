import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Dimensions, StyleSheet, Text, TextInput} from 'react-native';
import {
  colors,
  containerStyles,
  marginStyles,
  paddingStyles,
} from '../../styles/common';
import {CalendarList, DateData} from 'react-native-calendars';
import BottomSheet from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAllDailyData,
  selectWeeklyGoals,
  setDailyData,
} from '../../stores/slices/data';
import FootImage from '../../assets/foot-sign.svg';
import WaterImage from '../../assets/water.svg';
import {calculateColor} from '../../utils/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

// const BackDrop = (props: BottomSheetBackdropProps) => {
//   useEffect(() => {
//     console.log('Backdrop', props.animatedIndex);
//   });
//   console.debug('Backdrop', props);

//   return <View style={bottomSheetContentStyles.backdropStyle} />;
// };

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [editMode, setEditMode] = useState(false);
  const [editedWater, setEditedWater] = useState<string>('0');
  const dispatch = useDispatch();

  const dailyData = useSelector(selectAllDailyData);
  const weeklyGoals = useSelector(selectWeeklyGoals);
  const selectedDayData = dailyData[selectedDate] || {water: 0, steps: 0};

  useEffect(() => {
    setEditedWater(selectedDayData.water.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

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

  const editWaterHandler = () => {
    bottomSheetRef.current?.snapToIndex(1);
    setEditMode(true);
  };

  const saveWaterHandler = () => {
    setEditMode(false);
    bottomSheetRef.current?.snapToIndex(0);
    dispatch(
      setDailyData({
        date: selectedDate,
        data: {water: parseInt(editedWater, 10)},
      }),
    );
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
              <View style={bottomSheetContentStyles.dataTextContainer}>
                <Text style={bottomSheetContentStyles.subtitle}>
                  Water Consumed -{' '}
                </Text>
                {editMode && (
                  <>
                    <TextInput
                      style={bottomSheetContentStyles.editInput}
                      value={editedWater}
                      onChangeText={setEditedWater}
                    />
                    <TouchableOpacity onPress={saveWaterHandler}>
                      <Icon name="check" size={18} color={colors.black} />
                    </TouchableOpacity>
                  </>
                )}
                {!editMode && (
                  <>
                    <Text style={bottomSheetContentStyles.numberInfo}>
                      {selectedDayData.water}
                    </Text>
                    <TouchableOpacity onPress={editWaterHandler}>
                      <Icon
                        name="pencil-outline"
                        size={18}
                        color={colors.black}
                      />
                    </TouchableOpacity>
                  </>
                )}
                <Text style={bottomSheetContentStyles.subtitle}>ml</Text>
              </View>
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
  backdropStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.5,
  },
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
  dataTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  editInput: {
    borderColor: colors.black,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 5,
    // width: 100,
    color: colors.black,
    fontSize: 16,
    zIndex: 1,
  },
});

export default CalendarScreen;
