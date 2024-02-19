import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  colors,
  containerStyles,
  marginStyles,
  textStyles,
} from '../../styles/common';
import {Switch} from 'react-native';
import notifee, {
  AuthorizationStatus,
  IntervalTrigger,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

const mmkv = new MMKVLoader().initialize();

const NotificationPage = () => {
  const [isEnabled, setIsEnabled] = useMMKVStorage('notification', mmkv, false);
  const [notificationInterval, setNotificationInterval] = useMMKVStorage(
    'notificationInterval',
    mmkv,
    false,
  );

  const toggleSwitch = async () => {
    if (!isEnabled) {
      const permission = await notifee.requestPermission();
      if (permission.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
        console.log('Permission Granted');
      }
      createIntervalNotification();
    } else {
      // Cancel all notifications as the user has disabled the notifications
      console.debug('Cancelling all notifications as the user has disabled it');
      await notifee.cancelAllNotifications();
    }
    setIsEnabled(previousState => !previousState);
  };

  const createIntervalNotification = async () => {
    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: notificationInterval ? 20 : 15,
      timeUnit: TimeUnit.MINUTES,
    };
    console.debug('Creating interval notification');
    await notifee.cancelTriggerNotifications();
    console.debug('Cancelled all previous notifications');

    const remainders = await notifee.createTriggerNotification(
      {
        title: 'Health Tracker',
        body: 'Time to log your health data',
        android: {
          channelId: 'default',
        },
        ios: {
          sound: 'default',
        },
      },
      trigger,
    );

    console.log('Notification created', remainders);
  };

  const toggleInterval = async () => {
    createIntervalNotification();
    setNotificationInterval(previousState => {
      return !previousState;
    });
  };

  return (
    <View
      style={[
        containerStyles.fullWidthContainer,
        {backgroundColor: colors.white},
      ]}>
      <Text style={[textStyles.title, styles.textCenter]}>
        Notification Remainder
      </Text>
      <View style={[marginStyles.medium]}>
        <View
          style={[containerStyles.rowContainer, styles.spaceBetweenContainer]}>
          <Text style={[styles.subtitle]}>Remainder </Text>
          <Switch onChange={toggleSwitch} value={isEnabled} />
        </View>
        {isEnabled && (
          <View
            style={[
              containerStyles.horizontallyCenteredContainer,
              marginStyles.large,
            ]}>
            <Text style={[styles.subtitle]}>Notification Interval </Text>
            <View style={[containerStyles.rowContainer]}>
              <Text style={!notificationInterval ? styles.boldText : {}}>
                Every 30 mins
              </Text>
              <Switch onChange={toggleInterval} value={notificationInterval} />
              <Text style={notificationInterval ? styles.boldText : {}}>
                Every 1 hour
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    color: colors.black,
  },
  textCenter: {
    textAlign: 'center',
  },
  spaceBetweenContainer: {
    justifyContent: 'space-between',
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default NotificationPage;
