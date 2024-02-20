import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/common';

type Props = {
  title: string;
  icon?: React.ReactNode;
  textColor?: string;
  iconPosition?: 'left' | 'right';
  pressHandler?: () => void;
};

const IconTextButton = (props: Props) => {
  const defaultIcon = (
    <Ionicons
      name="play-circle-outline"
      size={30}
      color={colors.progressIndicator.water}
    />
  );

  const {
    title = 'Check Now',
    icon = defaultIcon,
    textColor = colors.black,
    iconPosition = 'left',
  } = props;

  const styles = StyleSheet.create({
    container: {
      flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
    },
    textStyle: {
      fontSize: 12,
      fontWeight: '400',
      color: textColor,
      flexShrink: 1,
    },
  });
  return (
    <TouchableOpacity onPress={props.pressHandler}>
      <View style={styles.container}>
        {icon}
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconTextButton;
