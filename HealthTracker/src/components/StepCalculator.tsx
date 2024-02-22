import React, {useEffect} from 'react';
import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggingIn} from '../stores/slices/auth';
import {addSteps, saveData} from '../stores/slices/data';
import {lowpassFilter} from '../utils/filters';
import {Alert} from 'react-native';

setUpdateIntervalForType(SensorTypes.accelerometer, 400); // in milliseconds

const StepCalculator = () => {
  const isLoggedIn = useSelector(selectIsLoggingIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    let lastMagnitude = 0;
    let stepCount = 0;

    const threshold = 0.2;
    const filterFactor = 0.1;

    // if (!accelerometer.isSensorAvailable) {
    //   Alert.alert(
    //     'Sensor not available',
    //     'Accelerometer is not available on this device',
    //   );
    //   return;
    // }
    const subscription = accelerometer.subscribe(
      ({x, y, z}) => {
        x = Math.abs(x) > 7 ? 0 : x;
        y = Math.abs(y) > 7 ? 0 : y;
        z = Math.abs(z) > 7 ? 0 : z;
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        const filteredMagnitude = lowpassFilter(
          magnitude,
          lastMagnitude,
          filterFactor,
        );
        if (
          Math.abs(filteredMagnitude - lastMagnitude) > threshold &&
          filteredMagnitude > lastMagnitude
        ) {
          console.log('Step detected', stepCount);
          stepCount++;
          dispatch(addSteps({data: 1}));
          if (stepCount % 10 === 0) {
            console.debug('Saving Data');
            dispatch(saveData());
          }
        }
        lastMagnitude = filteredMagnitude;
      },
      _ => {
        // console.error('The sensor is not available', error);
        Alert.alert(
          'Sensor not available',
          'Accelerometer is not available on this device',
        );
      },
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [isLoggedIn, dispatch]);
  return <></>;
};

export default StepCalculator;
