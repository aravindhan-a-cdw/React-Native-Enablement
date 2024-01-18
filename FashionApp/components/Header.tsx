import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Badge from '../components/Badge';
import {StackHeaderProps} from '@react-navigation/stack';

const Header: React.FC<StackHeaderProps> = props => {
  console.log(props);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.appIcon}>FSHN</Text>
      <View>
        <Icon name="cart-outline" size={30} color={'#000'} />
        <Badge data="1" />
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
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  appIcon: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
  },
});

export default Header;
