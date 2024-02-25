import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  colors,
  containerStyles,
  marginStyles,
  paddingStyles,
} from '../styles/common';
import {CalendarConstants} from '../constants/pageConstants';
import {useSelector} from 'react-redux';
import {selectAllDailyData} from '../stores/slices/data';
import FootImage from '../assets/foot-sign.svg';
import WaterImage from '../assets/water.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  selectedDate: string;
  editMode: boolean;
  editedWater: string;
  setEditedWater: (value: string) => void;
  saveWaterHandler: () => void;
  editWaterHandler: () => void;
};

const SelectedDateContent = (props: Props) => {
  const {
    selectedDate,
    editMode,
    editedWater,
    setEditedWater,
    saveWaterHandler,
    editWaterHandler,
  } = props;

  const dailyData = useSelector(selectAllDailyData);
  const selectedDayData = dailyData[selectedDate] || {water: 0, steps: 0};

  return (
    <View style={[containerStyles.horizontallyCenteredContainer]}>
      <Text style={bottomSheetContentStyles.title}>
        {CalendarConstants.VIEW_DATA_FOR}
        {selectedDate}
      </Text>
      <View style={bottomSheetContentStyles.infoContainer}>
        <View style={bottomSheetContentStyles.dataContainer}>
          <FootImage width={50} height={50} />
          <Text style={bottomSheetContentStyles.subtitle}>
            {CalendarConstants.STEPS_WALKED}
            <Text style={bottomSheetContentStyles.numberInfo}>
              {selectedDayData.steps}
            </Text>
          </Text>
        </View>
        <View style={bottomSheetContentStyles.dataContainer}>
          <WaterImage width={50} height={50} />
          <View style={bottomSheetContentStyles.dataTextContainer}>
            <Text style={bottomSheetContentStyles.subtitle}>
              {CalendarConstants.WATER_CONSUMED}
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
                  <Icon name="pencil-outline" size={18} color={colors.black} />
                </TouchableOpacity>
              </>
            )}
            <Text style={bottomSheetContentStyles.subtitle}>
              {CalendarConstants.WATER_MEASURE}
            </Text>
          </View>
        </View>
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
    color: colors.black,
    fontSize: 16,
    zIndex: 1,
  },
});

export default SelectedDateContent;
