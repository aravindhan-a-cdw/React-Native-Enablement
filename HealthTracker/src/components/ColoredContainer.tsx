import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors} from '../styles/common';

type ColoredContainerProps = {
  title?: string;
  value?: string;
  icon: React.ReactNode;
  backgroundColor: string;
  iconBackgroundColor?: string;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  onPress?: () => void;
};

const width = Dimensions.get('window').width;

const ColoredContainer = (props: ColoredContainerProps) => {
  const {children, value, title, icon, onPress} = props;
  const {iconPosition} = {...props, iconPosition: props.iconPosition || 'left'};
  const dynamicStyles = StyleSheet.create({
    progressContainer: {
      backgroundColor: props.backgroundColor,
      flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
    },
  });

  const content = (
    <>
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
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={progressStyles.progressValue}>
            {props.value}
          </Text>
        )}
        {title && (
          <Text style={progressStyles.progressTitle}>{props.title}</Text>
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          progressStyles.progressContainer,
          dynamicStyles.progressContainer,
        ]}
        onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={[
        progressStyles.progressContainer,
        dynamicStyles.progressContainer,
      ]}>
      {content}
    </View>
  );
};

const progressStyles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    flexShrink: 1,
    flexGrow: 1,
    gap: 10,
    padding: 20,
    borderRadius: 15,
    flexBasis: '50%',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
  },
  textContainer: {
    gap: 5,
    flex: 1,
  },
  progressTitle: {
    fontSize: width * 0.03,
    color: colors.gray,
  },
  progressValue: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default ColoredContainer;
