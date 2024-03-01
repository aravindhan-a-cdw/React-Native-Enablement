import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MapView, {
  LatLng,
  Marker,
  UserLocationChangeEvent,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Shoe from '../../assets/shoe-image.svg';
import {calculateAngle} from '../../utils/calculations';
import {requestLocationPermission} from '../../utils/permissions';

const StepTracker = () => {
  const provider = Platform.OS === 'android' ? 'google' : undefined;

  const [positions, setPositions] = useState<LatLng[]>([]);

  let flip = false;

  const handleLocationChange = (event: UserLocationChangeEvent) => {
    console.log(event.nativeEvent.coordinate);
    event.persist();
    if (event.nativeEvent === null || event.nativeEvent.coordinate === null) {
      return;
    }
    setPositions(prevState => [
      ...prevState,
      {
        latitude: event.nativeEvent?.coordinate?.latitude || 0,
        longitude: event.nativeEvent?.coordinate?.longitude || 0,
      },
    ]);
  };

  useEffect(() => {
    requestLocationPermission();

    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      locationProvider: 'playServices',
    });
    // const result = Geolocation.watchPosition(
    //   (info: any) => {
    //     console.log(info);
    //     setPositions(prevState => [
    //       ...prevState,
    //       {
    //         latitude: info.coords.latitude,
    //         longitude: info.coords.longitude,
    //       },
    //     ]);
    //   },
    //   (error: any) => console.error(error),
    //   {
    //     interval: 2000,
    //     fastestInterval: 1000,
    //     timeout: 6000,
    //     maximumAge: 5000,
    //     useSignificantChanges: true,
    //   },
    // );
    // console.log(result);
    setInterval(() => {
      Geolocation.watchPosition(
        (info: any) => {
          console.log(info);
          setPositions(prevState => [
            ...prevState,
            {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            },
          ]);
        },
        (error: any) => console.error(error),
        {timeout: 6000, maximumAge: 5000},
      );
    }, 2000);
  }, []);

  // Geolocation.getCurrentPosition(
  //   info => console.log(info),
  //   error => console.error(error),
  //   {timeout: 6000, maximumAge: 5000},
  // );

  console.log('Rendering');

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        provider={provider}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        zoomControlEnabled
        cameraZoomRange={{
          animated: true,
          maxCenterCoordinateDistance: 10000,
          minCenterCoordinateDistance: 10,
        }}
        onUserLocationChange={handleLocationChange}
        initialRegion={{
          latitude: 12.9827,
          longitude: 80.2307,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {positions.map((coordinate, index) => {
          let rotation = 0;
          if (index < positions.length - 1) {
            rotation = calculateAngle(positions[index], positions[index + 1]);
          }
          flip = !flip;
          console.log(flip);

          return (
            <Marker key={`coordinate_${index}`} coordinate={coordinate}>
              {/* <View style={styles.step} /> */}
              <Shoe
                width={30}
                height={30}
                style={{
                  transform: [
                    {rotate: `${rotation}deg`},
                    {rotateY: flip ? '0deg' : '180deg'},
                  ],
                }}
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default StepTracker;
