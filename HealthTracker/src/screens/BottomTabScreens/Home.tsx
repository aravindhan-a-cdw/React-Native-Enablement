import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../styles/common';
import WeeklyProgress from '../../components/WeeklyProgress';
import DailyProgress from '../../components/DailyProgress';
import Banner from '../../components/Banner';
import IconTextButton from '../../components/IconTextButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CycleRider from '../../assets/bicycle_rider.svg';
import WeighScale from '../../assets/weighing-scale.svg';
import {BottomTabNavigatorPropType} from '../../navigators/BottomTabNavigator';
import {useSelector} from 'react-redux';
import {selectUser} from '../../stores/slices/auth';

type Props = {
  navigation: BottomTabNavigatorPropType;
};

const Home = (props: Props) => {
  // This is the home screen of Bottom Tab Navigator

  const {navigation} = props;
  const user = useSelector(selectUser);
  const width = Dimensions.get('window').width;

  const articleClickHandler = (articleId: string) => {
    console.log('Article Clicked');
    navigation.navigate('stack.article', {articleId});
  };

  const dynamicStyles = StyleSheet.create({
    titleSize: {
      fontSize: width / 20,
    },
    subtitleSize: {
      fontSize: width / 30,
    },
  });

  const iconWidth = width / 3;

  const userName = user?.name;
  return (
    <View style={[styles.container]}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleLight}>Insight Timer</Text>
            <Text style={styles.titleDark}>Hi! {userName}</Text>
          </View>
          <DailyProgress />
          <WeeklyProgress />
          <Banner
            icon={<CycleRider width={iconWidth} height={iconWidth * 0.9} />}>
            <Text style={[styles.bannerTitle, dynamicStyles.titleSize]}>
              Learn About {'\n'}Heartbeat
            </Text>
            <IconTextButton
              title="Check Now"
              pressHandler={() => articleClickHandler('heart-beat')}
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
            icon={<WeighScale width={iconWidth} height={iconWidth * 0.9} />}
            iconPosition="right">
            <Text style={[styles.bannerTitle, dynamicStyles.titleSize]}>
              Plan your diet {'\n'}for weightloss
            </Text>
            <IconTextButton
              title="Check Now"
              pressHandler={() => articleClickHandler('weight-loss')}
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
    </View>
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
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default Home;
