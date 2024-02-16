import React, {useEffect} from 'react';
import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggingIn} from '../stores/slices/auth';
import {addSteps} from '../stores/slices/data';

setUpdateIntervalForType(SensorTypes.accelerometer, 800); // in milliseconds

const StepCalculator = () => {
  const isLoggedIn = useSelector(selectIsLoggingIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const subscription = accelerometer.subscribe(({x, y, z, timestamp}) => {
      console.log({x, y, z, timestamp});
      if (x > 1.5 || z > 1.5) {
        dispatch(addSteps(1));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [isLoggedIn, dispatch]);
  return <></>;
};

export default StepCalculator;
