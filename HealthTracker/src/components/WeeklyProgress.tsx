import React, {useMemo} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, containerStyles, marginStyles} from '../styles/common';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useNavigation} from '@react-navigation/native';
import {StackNavigatorPropType} from '../navigators/StackNavigator';
import {useSelector} from 'react-redux';
import {selectAllDailyData, selectWeeklyGoals} from '../stores/slices/data';

const WeeklyProgress = () => {
  const navigation = useNavigation<StackNavigatorPropType>();

  const dailyData = useSelector(selectAllDailyData);
  const weeklyGoal = useSelector(selectWeeklyGoals);

  const progressPercent = useMemo(() => {
    const possibleWeekData = Object.keys(dailyData)
      .sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      })
      .slice(0, 7)
      .reverse();
    const weekDay = new Date(possibleWeekData[0]).getDay();
    const weekData = possibleWeekData.slice(0, weekDay + 1);

    const weekProgress = weekData.reduce(
      (acc, curr) => {
        return {
          steps: acc.steps + dailyData[curr].steps,
          water: acc.water + dailyData[curr].water,
        };
      },
      {steps: 0, water: 0},
    );

    return Math.round(
      ((Math.min(weekProgress.steps / weeklyGoal.steps, 0.5) +
        Math.min(weekProgress.water / weeklyGoal.water, 0.5)) /
        2) *
        100,
    );
  }, [dailyData, weeklyGoal]);

  const width = Dimensions.get('window').width;

  const pressHandler = () => {
    navigation.navigate('stack.report');
  };

  const dynamicStyles = StyleSheet.create({
    titleSize: {
      fontSize: width / 18,
    },
    subtitleSize: {
      fontSize: width / 30,
    },
  });

  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, dynamicStyles.titleSize]}>
            Your Weekly{'\n'}Progress
          </Text>
          <Text style={[styles.subtitle, dynamicStyles.subtitleSize]}>
            Your weekly report
          </Text>
        </View>
        <AnimatedCircularProgress
          size={width / 3.5}
          width={12}
          fill={progressPercent}
          fillLineCap="round"
          rotation={30}
          duration={2000}
          delay={500}
          tintColor="#fff"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#A8B1FF"
          children={prop => {
            return (
              <View
                style={[
                  containerStyles.rowContainer,
                  styles.progressContainer,
                ]}>
                <Text style={styles.progressNumber}>{Math.round(prop)}</Text>
                <Text style={styles.percentage}>%</Text>
              </View>
            );
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.progressIndicator.weeklyProgressBackground,
    marginHorizontal: marginStyles.medium.margin,
    marginBottom: marginStyles.medium.margin,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-around',
  },
  textContainer: {
    alignItems: 'flex-start',
    gap: 10,
    flexShrink: 1, // This is used to make sure that the text does not overflow
  },
  title: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 20,
  },
  subtitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '300',
  },
  progressContainer: {
    gap: 2,
  },
  progressNumber: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  percentage: {
    color: colors.white,
    fontSize: 12,
    alignSelf: 'flex-end',
    transform: [{translateY: -5}],
  },
});

export default WeeklyProgress;
