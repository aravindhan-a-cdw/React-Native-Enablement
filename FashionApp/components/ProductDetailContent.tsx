import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Product} from '../types/Product';
import {BLACK, CURRENT_PRICE} from '../constants/color';
import {PRODUCT_DETAIL_CONTENT} from '../constants/component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductOptions from './ProductOptions';

type Props = {
  data: Product;
};

export default function ProductDetailContent(props: Props) {
  const {data: product} = props;
  return (
    <View style={styles.productDetailContainer}>
      <Text numberOfLines={1} style={styles.productTitle}>
        {product.product_name}
      </Text>
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
              {product.price_details.discount} {PRODUCT_DETAIL_CONTENT.OFF}
            </Text>
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <Icon color={BLACK} name="star" size={24} />
          <Text style={styles.ratingText}>
            {product.rating_details.rating}/{product.rating_details.scale}
          </Text>
        </View>
      </View>
      <ProductOptions
        title={PRODUCT_DETAIL_CONTENT.AVAILABLE_SIZES}
        options={product.available_sizes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productDetailContainer: {
    paddingVertical: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BLACK,
    fontFamily: 'Poppins',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
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
    color: CURRENT_PRICE,
  },
  actualPrice: {
    textDecorationLine: 'line-through',
    fontSize: 16,
  },
  discountPercent: {
    fontSize: 16,
    color: BLACK,
    fontWeight: '400',
  },
});
