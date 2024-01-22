import {Text, View, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Badge from '../components/Badge';
import {StackHeaderProps} from '@react-navigation/stack';
import Cart from '../state/cart';
import {BLACK, WHITE} from '../constants/color';
import {HEADER} from '../constants/component';

const Header: React.FC<StackHeaderProps> = () => {
  const {cartItems} = useContext(Cart);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.appIcon}>{HEADER.TITLE}</Text>
      <View>
        <Icon name="cart-outline" size={30} color={BLACK} />
        <Badge data={cartItems.length} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: WHITE,
    paddingBottom: 20,
  },
  appIcon: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: '900',
    color: BLACK,
  },
});

export default Header;
