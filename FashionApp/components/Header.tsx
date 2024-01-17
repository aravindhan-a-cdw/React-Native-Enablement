import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Badge from '../components/Badge';

const Header: React.FC = () => {
  return (
    <View>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.appIcon}>FSHN</Text>
        <View>
          <Icon name="cart-outline" size={30} color={'#000'} />
          <Badge data="1" />
        </View>
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
  },
  appIcon: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
  },
});

export default Header;
