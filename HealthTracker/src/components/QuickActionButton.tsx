import React from 'react';
import {StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {addWater} from '../stores/slices/data';

const QuickActionButton = () => {
  const dispatch = useDispatch();

  return (
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
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 20,
    color: 'white',
  },
  actionButton: {
    bottom: -5,
    right: -5,
  },
});

export default QuickActionButton;
