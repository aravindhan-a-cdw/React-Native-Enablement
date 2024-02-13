import React from 'react';
import {StyleSheet, View} from 'react-native';
import ColoredContainer from './ColoredContainer';
import {colors, paddingStyles} from '../styles/common';

type Props = {
  icon: React.ReactNode;
  color?: string;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
};

const Banner = (props: Props) => {
  const {
    icon,
    iconPosition = 'left',
    children,
    color = colors.mainArticleBackground,
  } = props;
  return (
    <View style={styles.container}>
      <ColoredContainer
        backgroundColor={color}
        iconPosition={iconPosition}
        icon={icon}>
        <View style={styles.textContainer}>
          {children}
          {/* <Text style={styles.title}>Learn About {'\n'}Heartbeat.</Text>
          <IconTextButton
            title="Check Now"
            icon={
              <Ionicons
                name="play-circle-outline"
                size={30}
                color={colors.progressIndicator.water}
              />
            }
          /> */}
        </View>
      </ColoredContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: paddingStyles.medium.padding,
    paddingBottom: paddingStyles.medium.padding,
  },
  textContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
});

export default Banner;
