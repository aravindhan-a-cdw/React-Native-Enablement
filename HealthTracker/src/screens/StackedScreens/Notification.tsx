import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, containerStyles, marginStyles} from '../../styles/common';
import {Switch} from 'react-native';
import notifee, {
  AuthorizationStatus,
  IntervalTrigger,
  Notification,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {
  DEFAULT_NOTIFCATION_INTERVAL,
  NOTIFICATION_INTERVALS,
} from '../../constants/app';

const mmkv = new MMKVLoader().initialize();
const width = Dimensions.get('window').width;

const NotificationPage = () => {
  const [isEnabled, setIsEnabled] = useMMKVStorage('notification', mmkv, false);
  const [notificationInterval, setNotificationInterval] = useMMKVStorage(
    'notificationInterval',
    mmkv,
    DEFAULT_NOTIFCATION_INTERVAL,
  );

  const toggleSwitch = async () => {
    if (!isEnabled) {
      const permission = await notifee.requestPermission();
      if (permission.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
        console.log('Permission Granted');
      }
      await createIntervalNotification(notificationInterval);
    } else {
      // Cancel all notifications as the user has disabled the notifications
      console.debug('Cancelling all notifications as the user has disabled it');
      await notifee.cancelAllNotifications();
    }
    setIsEnabled(previousState => !previousState);
  };

  const createIntervalNotification = async (interval: number) => {
    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: interval,
      timeUnit: TimeUnit.MINUTES,
    };

    const channel = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const notification: Notification = {
      title: 'Health Tracker',
      body: 'Time to log your health data',
      android: {
        channelId: channel,
      },
      ios: {
        sound: 'default',
      },
    };
    await notifee.cancelAllNotifications();
    console.debug('Cancelled all previous notifications');

    await notifee.displayNotification({
      ...notification,
      body: `You will be notified every ${interval} mins from now!`,
    });
    console.debug('Creating interval notification');

    const reminderId = await notifee.createTriggerNotification(
      notification,
      trigger,
    );

    console.log('Notification created', reminderId);
  };

  const handleNotificationIntervalChange = async (interval: number) => {
    setNotificationInterval(interval);
    await createIntervalNotification(interval);
  };

  const ButtonGroup = NOTIFICATION_INTERVALS.map((interval, index, array) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.button,
          notificationInterval === interval && styles.selectedButton,
          index === 0 && styles.buttonStart,
          index === array.length - 1 && styles.buttonEnd,
        ]}
        onPress={() => handleNotificationIntervalChange(interval)}>
        <Text
          style={[
            styles.intervalText,
            notificationInterval === interval && styles.boldText,
          ]}>
          {interval} mins
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={[
        containerStyles.fullHeightContainer,
        {backgroundColor: colors.white},
      ]}>
      <Text style={[styles.title, styles.textCenter]}>
        Notification Reminder
      </Text>
      <View style={[marginStyles.medium]}>
        <View
          style={[containerStyles.rowContainer, styles.spaceBetweenContainer]}>
          <Text style={[styles.subtitle]}>Reminder </Text>
          <Switch onChange={toggleSwitch} value={isEnabled} />
        </View>
        {isEnabled && (
          <View
            style={[
              containerStyles.horizontallyCenteredContainer,
              marginStyles.large,
              styles.notificationIntervalsContainer,
            ]}>
            <Text style={[styles.subtitle]}>Notification Interval </Text>
            <View style={[containerStyles.rowContainer]}>{ButtonGroup}</View>
            <Text style={styles.boldText}>
              You will be notified every {notificationInterval} mins!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: width * 0.06,
    color: colors.black,
  },
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
  notificationIntervalsContainer: {
    gap: 20,
  },
  intervalText: {
    fontSize: width * 0.03,
    color: colors.black,
  },
  button: {
    padding: 10,
    borderColor: colors.black,
    // borderWidth: 1,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 1,
  },
  buttonStart: {
    borderLeftWidth: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonEnd: {
    borderRightWidth: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  selectedButton: {
    backgroundColor: colors.primaryColor,
  },
  boldText: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default NotificationPage;
