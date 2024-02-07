import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';

import {Colors} from 'react-native/Libraries/NewAppScreen';

setUpdateIntervalForType(SensorTypes.accelerometer, 200); // defaults to 100ms

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [values, setValues] = React.useState([0, 0, 0]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const subscription = accelerometer
    .pipe(
      map(({x, y, z}) => Math.abs(x) + Math.abs(y) + Math.abs(z)),
      filter(speed => speed > 10),
    )
    .subscribe(speed => console.log(`You moved your phone with ${speed}`));

  useEffect(() => {
    subscription.add(
      accelerometer.subscribe(({x, y, z}) => {
        console.log('x, y, z', x, y, z);
        setValues([x * 100, y * 10, z * 100]);
      }),
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [subscription]);

  // setTimeout(() => {
  //   // If it's the last subscription to accelerometer it will stop polling in the native API
  //   subscription.unsubscribe();
  // }, 1000);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Hello</Text>
        <View
          style={[
            styles.dot,
            {transform: [{translateX: values[0]}, {translateY: values[1]}]},
          ]}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  dot: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
  },
});

export default App;
