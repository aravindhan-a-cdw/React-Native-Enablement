import BottomSheet from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductDetailContent from '../components/ProductDetailContent';
import {BLACK, LIGHT_GRAY, WHITE} from '../constants/color';
import Cart from '../state/cart';
import {PRODUCT_DETAIL} from '../constants/component';
import {padding} from '../styles/common';

const ProductDetail: React.FC = (props: any) => {
  const {
    route: {params},
    navigation,
  } = props;

  const {product} = params;
  const snapPoints = useMemo(() => ['40%', '70%'], []);
  const {cartItems, setCartItems} = React.useContext(Cart);

  const addToCartHandler = () => {
    const newCartItems = [...cartItems];

    const productIndex = cartItems.findIndex(item => item.id === product.id);
    if (productIndex !== -1) {
      newCartItems[productIndex].quantity += 1;
    } else {
      newCartItems.push({id: product.id, quantity: 1});
    }
    setCartItems(newCartItems);
  };

  useEffect(() => {
    navigation.setParams({type: 'secondary'});
  }, [navigation]);
  return (
    <GestureHandlerRootView>
      <StatusBar
        animated
        showHideTransition="slide"
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent
      />
      <View style={styles.productContainer}>
        <Image style={styles.image} source={{uri: product.modelImg}} />
        <BottomSheet
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetContainer}
          handleIndicatorStyle={styles.handleIndicator}>
          <ProductDetailContent data={product} />
        </BottomSheet>
        <View style={styles.bottomOptionsContainer}>
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="heart" size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="hanger" size={30} />
          </TouchableOpacity>
          <View style={styles.cartButtonContainer}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={addToCartHandler}>
              <Text style={styles.addToCartText}>
                {PRODUCT_DETAIL.ADD_TO_CART}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '60%',
  },
  productContainer: {
    height: '100%',
  },
  bottomSheetContainer: {
    borderRadius: 0,
  },
  handleIndicator: {
    backgroundColor: LIGHT_GRAY,
    width: '20%',
  },

  bottomOptionsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '13%',
    zIndex: 1,
    ...padding(20, 20),
    paddingBottom: 30,
    flexDirection: 'row',
    gap: 20,
    borderColor: LIGHT_GRAY,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconButtonStyle: {
    flexBasis: '15%',
  },
  iconStyle: {
    color: BLACK,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 30,
    height: 60,
    width: 60,
    overflow: 'hidden',
    padding: 15,
  },
  cartButtonContainer: {
    flex: 3,
  },
  addToCartButton: {
    backgroundColor: BLACK,
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  addToCartText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});

export default ProductDetail;
