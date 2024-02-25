import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {addWater} from '../stores/slices/data';

const QuickActionButton = () => {
  const dispatch = useDispatch();

  const add250mlWater = useCallback(() => {
    dispatch(addWater({data: 250}));
  }, [dispatch]);

  const add500mlWater = useCallback(() => {
    dispatch(addWater({data: 500}));
  }, [dispatch]);

  return (
    <ActionButton style={styles.actionButton} buttonColor="rgba(231,76,60,1)">
      <ActionButton.Item
        buttonColor="#9b59b6"
        angle={-15}
        onPress={add250mlWater}>
        <MaterialIcon
          size={30}
          name="cup-water"
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        angle={-70}
        onPress={add500mlWater}>
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
    color: 'white',
  },
  actionButton: {
    bottom: 0,
    right: 0,
  },
});

export default QuickActionButton;
