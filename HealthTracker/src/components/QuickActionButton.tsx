import React from 'react';
import {StyleSheet, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {addWater} from '../stores/slices/data';

const QuickActionButton = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ActionButton style={styles.actionButton} buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Add 250ml"
          onPress={() => dispatch(addWater({data: 250}))}>
          <MaterialIcon name="cup-water" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Add 500ml"
          onPress={() => dispatch(addWater({data: 500}))}>
          <MaterialIcon name="glass-mug" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 20,
    color: 'white',
  },
  actionButton: {
    bottom: 40,
    right: -15,
  },
});

export default QuickActionButton;
