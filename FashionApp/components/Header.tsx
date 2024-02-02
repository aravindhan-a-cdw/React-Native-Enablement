import {Text, View, StyleSheet, Platform} from 'react-native';
import React, {useCallback, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Badge from '../components/Badge';
import Cart from '../state/cart';
import {BLACK, DARK_GRAY, WHITE} from '../constants/color';
import {HEADER} from '../constants/component';

const Header: React.FC<any> = props => {
  const {navigation, route} = props;
  route.params;

  const {cartItems} = useContext(Cart);
  const backNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const cartHandler = useCallback(() => {}, []);

  switch (props.route?.params.type) {
    case 'primary':
      return (
        <View style={primaryStyles.headerContainer}>
          <Text style={styles.titleText}>{HEADER.TITLE}</Text>
          <View>
            <Badge data={cartItems.length}>
              <Icon name="cart-outline" size={30} color={BLACK} />
            </Badge>
          </View>
        </View>
      );
    case 'secondary':
      return (
        <View style={secondaryStyles.headerContainer}>
          <Icon
            name="arrow-left"
            onPress={backNavigationHandler}
            size={30}
            style={secondaryStyles.icon}
            color={BLACK}
          />
          <Badge data={cartItems.length} style={secondaryStyles.cartIconBadge}>
            <Icon
              name="cart-outline"
              onPress={cartHandler}
              size={30}
              style={secondaryStyles.icon}
              color={BLACK}
            />
          </Badge>
        </View>
      );
  }
};

const primaryStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: WHITE,
    paddingBottom: 20,
  },
});

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: '900',
    color: BLACK,
  },
});

const secondaryStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    paddingBottom: 20,
  },
  cartIconBadge: {
    top: 12,
    right: 12,
  },
  icon: {
    color: BLACK,
    backgroundColor: WHITE,
    borderRadius: 30,
    overflow: 'hidden',
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

export default Header;
