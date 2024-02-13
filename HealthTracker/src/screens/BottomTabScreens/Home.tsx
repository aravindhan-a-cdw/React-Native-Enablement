import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../styles/common';
import WeeklyProgress from '../../components/WeeklyProgress';
import DailyProgress from '../../components/DailyProgress';
import Banner from '../../components/Banner';
import IconTextButton from '../../components/IconTextButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CycleRider from '../../assets/bicycle_rider.svg';
import WeighScale from '../../assets/weighing-scale.svg';

const Home = () => {
  // This is the home screen of Bottom Tab Navigator
  const userName = 'Aravindhan';
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleLight}>Insight Timer</Text>
          <Text style={styles.titleDark}>Hi! {userName}</Text>
        </View>
        <DailyProgress />
        <WeeklyProgress />
        <Banner icon={<CycleRider width={150} height={150} />}>
          <Text style={styles.bannerTitle}>Learn About {'\n'}Heartbeat.</Text>
          <IconTextButton
            title="Check Now"
            icon={
              <Ionicons
                name="play-circle-outline"
                size={30}
                color={colors.progressIndicator.water}
              />
            }
          />
        </Banner>
        <Banner
          color={colors.progressIndicator.stepsIconBackground}
          icon={<WeighScale width={150} height={150} />}
          iconPosition="right">
          <Text style={styles.bannerTitle}>
            Plan your diet {'\n'}for weightloss
          </Text>
          <IconTextButton
            title="Check Now"
            icon={
              <Ionicons
                name="play-circle-outline"
                size={30}
                color={colors.progressIndicator.water}
              />
            }
          />
        </Banner>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: '2%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  titleLight: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: colors.gray,
  },
  titleDark: {
    fontSize: 24,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: colors.black,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default Home;
