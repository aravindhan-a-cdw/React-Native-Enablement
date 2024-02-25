import React, {useEffect} from 'react';
import {Platform, StyleSheet, Switch, Text, View} from 'react-native';
import {
  showFloatingBubble,
  requestPermission,
  initialize,
  checkPermission,
  hideFloatingBubble,
} from 'react-native-floating-bubble';
import {DeviceEventEmitter} from 'react-native';
import {colors, containerStyles, paddingStyles} from '../../styles/common';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {useDispatch} from 'react-redux';
import {addWater} from '../../stores/slices/data';
import {SettingsConstants} from '../../constants/pageConstants';

const mmkv = new MMKVLoader().initialize();

const Settings = () => {
  const [isFloatingWidgetEnabled, setIsFloatingWidgetEnabled] = useMMKVStorage(
    'floatingWidget',
    mmkv,
    false,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFloatingWidgetEnabled) {
      DeviceEventEmitter.addListener('floating-bubble-press', () => {
        console.log('floating-bubble-press');
        dispatch(addWater({data: 250}));
      });
      const eventCount = DeviceEventEmitter.listenerCount(
        'floating-bubble-press',
      );
      console.log('eventCount', eventCount);
    }
    if (!isFloatingWidgetEnabled) {
      DeviceEventEmitter.removeAllListeners('floating-bubble-press');
    }
  }, [dispatch, isFloatingWidgetEnabled]);

  const toggleSwitch = async () => {
    if (!isFloatingWidgetEnabled) {
      const allowed = checkPermission();
      console.log(allowed);
      if (!allowed) {
        requestPermission().catch(e => {
          console.log(e, e.message, 'Error in requestPermission');
        });
      }
      const recheck = checkPermission();
      if (!recheck) {
        return;
      }
      initialize();
      showFloatingBubble();
    } else {
      console.log('Hiding floating bubble');
      hideFloatingBubble();
    }
    setIsFloatingWidgetEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{SettingsConstants.TITLE}</Text>
      <View
        style={[containerStyles.rowContainer, styles.spaceBetweenContainer]}>
        <Text style={[styles.subtitle]}>
          {SettingsConstants.FLOATING_WIDGET}
        </Text>
        <Switch
          onChange={toggleSwitch}
          disabled={Platform.OS !== 'android'}
          value={isFloatingWidgetEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  spaceBetweenContainer: {
    justifyContent: 'space-between',
    flexBasis: 'auto',
    width: '100%',
    padding: paddingStyles.large.padding,
  },
  subtitle: {
    fontSize: 18,
    color: colors.black,
  },
});

export default Settings;
