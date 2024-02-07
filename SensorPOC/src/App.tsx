import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: `https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg`,
      y: 0,
    };
  }

  componentDidMount() {
    const subscription = gyroscope.subscribe(({y}) => {
      console.log('y: ', y);
      this.setState(state => ({
        y: y + state.y,
      }));
    });

    this.setState({subscription});
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  render() {
    const positionOnScreenX = -imageWidth / 2;
    // The y axis of the sensor data resembles what we need for the x axis
    // in the image
    const movementX = (-this.state.y / 1000) * imageWidth;

    return (
      <View style={styles.container}>
        <Image
          // translateX={positionOnScreenX + movementX}
          style={[
            styles.image,
            {transform: [{translateX: positionOnScreenX + movementX}]},
          ]}
          source={{uri: this.state.image}}
        />
      </View>
    );
  }
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
