import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../styles/common';

type ColoredContainerProps = {
  title?: string;
  value?: string;
  icon: React.ReactNode;
  backgroundColor: string;
  iconBackgroundColor?: string;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
};

const ColoredContainer = (props: ColoredContainerProps) => {
  const {children, value, title, icon} = props;
  const {iconPosition} = {...props, iconPosition: props.iconPosition || 'left'};
  const dynamicStyles = StyleSheet.create({
    progressContainer: {
      backgroundColor: props.backgroundColor,
      flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
    },
  });
  return (
    <View
      style={[
        progressStyles.progressContainer,
        dynamicStyles.progressContainer,
      ]}>
      <View
        style={[
          progressStyles.iconContainer,
          {backgroundColor: props.iconBackgroundColor},
        ]}>
        {icon}
      </View>
      <View style={progressStyles.textContainer}>
        {children}
        {value && (
          <Text style={progressStyles.progressValue}>{props.value}</Text>
        )}
        {title && (
          <Text style={progressStyles.progressTitle}>{props.title}</Text>
        )}
      </View>
    </View>
  );
};

const progressStyles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    flexGrow: 1,
    gap: 10,
    padding: 20,
    borderRadius: 15,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
  },
  textContainer: {
    gap: 5,
  },
  progressTitle: {
    fontSize: 14,
    color: colors.gray,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default ColoredContainer;
