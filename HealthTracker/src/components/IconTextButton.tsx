import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/common';

type Props = {
  title: string;
  icon?: React.ReactNode;
  textColor?: string;
  iconPosition?: 'left' | 'right';
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
      fontWeight: '400',
      color: textColor,
    },
  });
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

export default IconTextButton;
