import React, {useState} from 'react';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Notification = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'You have a new message!',
      body: 'Successfully displayed a notification!',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  async function setReminder() {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    await notifee.createTriggerNotification(
      {
        title: 'Reminder',
        body: message,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'mark-as-read',
          },
        },
        ios: {
          sound: 'default',
        },
      },
      trigger,
    );

    Alert.alert('Reminder Set', 'You will be reminded at the specified time');
    setMessage('');
  }

  return (
    <View>
      <Text style={styles.title}>Reminder</Text>
      <TextInput
        onChangeText={(text: string) => setMessage(text)}
        style={styles.textInput}
        placeholder="Enter your message"
        value={message}
      />
      <Button title="Choose Time" onPress={() => setOpen(true)} />

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Button title="Set Reminder" onPress={setReminder} />
      <Button title="Display a Notification" onPress={onDisplayNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 20,
  },
});

export default Notification;
