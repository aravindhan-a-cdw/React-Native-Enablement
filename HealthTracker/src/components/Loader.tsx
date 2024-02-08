import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectIsLoading} from '../stores/slices/loader';

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);
  return (
    // Show the loader if the isLoading is true
    isLoading && (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
});

export default Loader;
