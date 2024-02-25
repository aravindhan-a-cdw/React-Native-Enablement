import React from 'react';
import {StyleSheet} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {addWater} from '../stores/slices/data';

const QuickActionButton = () => {
  const dispatch = useDispatch();

  return (
    <ActionButton style={styles.actionButton} buttonColor="rgba(231,76,60,1)">
      <ActionButton.Item
        buttonColor="#9b59b6"
        // title="Add 250ml"
        angle={-15}
        onPress={() => dispatch(addWater({data: 250}))}>
        <MaterialIcon
          size={30}
          name="cup-water"
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        angle={-70}
        // title="Add 500ml"
        onPress={() => dispatch(addWater({data: 500}))}>
        <MaterialIcon
          name="glass-mug"
          size={30}
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
    </ActionButton>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    // fontSize: 30,
    color: 'white',
  },
  actionButton: {
    bottom: 0,
    right: 0,
  },
});

export default QuickActionButton;
