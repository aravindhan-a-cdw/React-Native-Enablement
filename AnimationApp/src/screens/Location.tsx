import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

const LocationScreen = () => {
  const [location, setLocation] = useState<GeolocationResponse>();

  const getLocation = () => {
    console.log(Geolocation);
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      locationProvider: 'auto',
    });
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      setLocation(info);
    });
    Geolocation.getCurrentPosition(info => console.log(info));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Location</Text>
      <Button title="Get my Location" onPress={getLocation} />
      {location && (
        <Text>
          {location.coords.latitude}, {location.coords.longitude}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LocationScreen;
