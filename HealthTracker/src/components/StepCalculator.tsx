import React, {useEffect} from 'react';
import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.accelerometer, 100); // in milliseconds

const StepCalculator = () => {
  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z, timestamp}) =>
      console.log({x, y, z, timestamp}),
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return <></>;
};

export default StepCalculator;
