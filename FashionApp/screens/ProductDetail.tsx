import BottomSheet from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Badge from '../components/Badge';

const ProductDetail: React.FC = (props: any) => {
  const {
    route: {params},
    navigation,
  } = props;
  const {product} = params;
  console.log('Sizes', product.available_sizes);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const snapPoints = useMemo(() => ['40%', '70%'], []);
  return (
    <GestureHandlerRootView>
      <View>
        <View style={styles.topBarOptions}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              style={styles.topBarIconStyle}
              name="arrow-left"
              size={30}
              color={'#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Icon
                style={styles.topBarIconStyle}
                name="cart-outline"
                size={30}
                color={'#000'}
              />
              <Badge style={styles.cartIconBadgeStyle} data="1" />
            </View>
          </TouchableOpacity>
        </View>
        <Image style={styles.image} source={{uri: product.modelImg}} />
        <BottomSheet
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetContainer}
          handleIndicatorStyle={styles.handleIndicator}>
          <View style={styles.productDetailContainer}>
            <Text style={styles.productTitle}>{product.product_name}</Text>
            <View style={styles.priceRatingContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>
                  {product.price_details.currency_code}{' '}
                  {product.price_details.current_price}
                </Text>
                <Text>
                  <Text style={styles.actualPrice}>
                    {product.price_details.currency_code}{' '}
                    {product.price_details.actual_price}
                  </Text>
                  <Text style={styles.discountPercent}>
                    {' '}
                    {product.price_details.discount} OFF
                  </Text>
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <Icon color={'#000'} name="star" size={24} />
                <Text style={styles.ratingText}>
                  {product.rating_details.rating}/{product.rating_details.scale}
                </Text>
              </View>
            </View>
            <View style={styles.sizeContainer}>
              <Text style={styles.sizeTitle}>Size Available:</Text>
              <View style={styles.sizes}>
                {product.available_sizes.map((size: string) => (
                  <Text style={styles.sizeText}>{size}</Text>
                ))}
              </View>
            </View>
          </View>
        </BottomSheet>
        <View style={styles.bottomOptionsContainer}>
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="heart" size={28} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="hanger" size={30} />
          </TouchableOpacity>
          <View style={styles.cartButtonContainer}>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

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
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomSheetContainer: {
    borderRadius: 0,
  },
  handleIndicator: {
    backgroundColor: '#f0f0f0',
    width: '20%',
  },
  productDetailContainer: {
    paddingVertical: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  ratingContainer: {
    alignItems: 'flex-end',
    gap: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
    fontFamily: 'Poppins',
  },
  priceContainer: {
    alignItems: 'flex-start',
    gap: 10,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#E2801C',
  },
  actualPrice: {
    textDecorationLine: 'line-through',
    fontSize: 16,
  },
  discountPercent: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  sizeContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 30,
    backgroundColor: '#F7F7F7',
  },
  sizes: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
  },
  sizeTitle: {
    fontSize: 17,
    color: '#949494',
    fontWeight: '500',
    fontFamily: 'Poppins',
    // flex: 1,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Poppins',
    // flex: 1,
  },
  bottomOptionsContainer: {
    position: 'absolute',
    bottom: 0,
    // transform: [{translateY: -10}],
    width: '100%',
    height: '13%',
    zIndex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    gap: 20,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
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
    color: '#000',
    backgroundColor: '#EEEEEE',
    borderRadius: 100,
    padding: 15,
  },
  cartButtonContainer: {
    flex: 3,
  },
  addToCartButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});

export default ProductDetail;
