import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Subscription} from 'rxjs';
import {
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

const window = Dimensions.get('window');

const deviceWidth = window.width;
const deviceHeight = window.height;

const imageWidth = deviceWidth;
const imageHeight = deviceHeight;

setUpdateIntervalForType(SensorTypes.gyroscope, 30);

export default function App() {
  const [data, setData] = useState({x: 0, y: 0, z: 0});
  const [subscription, setSubscription] = useState<Subscription>();
  const image =
    'https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg';

  useEffect(() => {
    const subscriptionFunc = gyroscope.subscribe(({x, y, z}) => {
      console.log('x: ', x, 'y: ', y, 'z: ', z);
      setData({x, y, z});
    });

    setSubscription(subscriptionFunc);

    return () => {
      subscription && subscription.unsubscribe();
    };
  }, []);

  const positionOnScreenX = -imageWidth / 2;
  // The y axis of the sensor data resembles what we need for the x axis
  // in the image
  const movementX = (-data.y / 1000) * imageWidth;

  return (
    <View style={styles.container}>
      <Image
        // translateX={positionOnScreenX + movementX}
        style={[
          styles.image,
          {transform: [{translateX: positionOnScreenX + movementX}]},
        ]}
        source={{uri: image}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 100,
    width: '100%',
    height: imageHeight,
    // width: imageWidth,
  },
});
