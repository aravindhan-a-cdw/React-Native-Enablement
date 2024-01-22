import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderWithBackAndCart from '../components/HeaderWithBackAndCart';
import ProductDetailContent from '../components/ProductDetailContent';
import {BLACK, LIGHT_GRAY, WHITE} from '../constants/color';
import Cart from '../state/cart';
import {PRODUCT_DETAIL} from '../constants/component';

const ProductDetail: React.FC = (props: any) => {
  const {
    route: {params},
    navigation,
  } = props;
  const {product} = params;
  const snapPoints = useMemo(() => ['40%', '70%'], []);
  const {cartItems, setCartItems} = React.useContext(Cart);

  const backNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const cartHandler = useCallback(() => {}, []);

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
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <GestureHandlerRootView>
      <View>
        <HeaderWithBackAndCart
          backNavigationHandler={backNavigationHandler}
          cartHandler={cartHandler}
          cartCount={cartItems.length}
        />
        <Image style={styles.image} source={{uri: product.modelImg}} />
        <BottomSheet
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetContainer}
          handleIndicatorStyle={styles.handleIndicator}>
          <ProductDetailContent data={product} />
        </BottomSheet>
        <View style={styles.bottomOptionsContainer}>
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="heart" size={28} />
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    gap: 20,
    borderColor: LIGHT_GRAY,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    elevation: 1,
  },
  iconButtonStyle: {
    flexBasis: '15%',
  },
  iconStyle: {
    color: BLACK,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 100,
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
