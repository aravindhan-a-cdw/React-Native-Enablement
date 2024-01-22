import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BLACK, DARK_GRAY, WHITE} from '../constants/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Badge from './Badge';

type Props = {
  backNavigationHandler: () => void;
  cartHandler: () => void;
  cartCount: number;
};

export default function HeaderWithBackAndCart(props: Props) {
  const {backNavigationHandler, cartHandler, cartCount} = props;
  return (
    <View style={styles.topBarOptions}>
      <TouchableOpacity onPress={backNavigationHandler}>
        <Icon
          style={styles.topBarIconStyle}
          name="arrow-left"
          size={30}
          color={BLACK}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={cartHandler}>
        <View>
          <Icon
            style={styles.topBarIconStyle}
            name="cart-outline"
            size={30}
            color={BLACK}
          />
          <Badge style={styles.cartIconBadgeStyle} data={cartCount} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBarOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    paddingBottom: 20,
  },
  cartIconBadgeStyle: {
    top: 12,
    right: 12,
  },
  topBarIconStyle: {
    color: BLACK,
    backgroundColor: WHITE,
    borderRadius: 100,
    padding: 15,
    shadowColor: DARK_GRAY,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
