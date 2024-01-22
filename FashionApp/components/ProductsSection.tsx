import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {offerProductsAPI, popularProductsAPI} from '../constants/api';
import {BLACK, DARK_GRAY, LIGHT_GRAY, WHITE} from '../constants/color';
import {PRODUCT_SECTION} from '../constants/component';
import {OfferProduct, Product} from '../types/Product';
import {ParamListBase, RouteProp} from '@react-navigation/native';

type OfferProductViewProps = {
  product: OfferProduct;
};

const OfferProductView = (props: OfferProductViewProps) => {
  const {product} = props;
  return (
    <View style={styles.offerProductContainer}>
      <ImageBackground
        style={styles.productImage}
        imageStyle={styles.productImageContainer}
        source={{
          uri: product.modelImg,
        }}>
        <View style={styles.offerProductTextContainer}>
          <Text style={styles.discountText}>{product.discountText}</Text>
          <View style={styles.discountCodeContainer}>
            <Text style={styles.discount}>{PRODUCT_SECTION.USE_CODE}</Text>
            <Text style={styles.discountCode}>{product.discountCode}</Text>
          </View>
          <Text style={styles.discountSlogan}>{product.discountSlogan}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

type PopularProductProps = {
  product: Product;
  selectHandler: (product: Product) => void;
};

const PopularProduct = (props: PopularProductProps) => {
  const {product, selectHandler} = props;
  const pressHandler = () => {
    selectHandler(product);
  };
  return (
    <View>
      <TouchableOpacity onPress={pressHandler}>
        <Image
          style={styles.popularProductImage}
          source={{uri: product.modelImg}}
        />
      </TouchableOpacity>
    </View>
  );
};

const Separator = () => <View style={styles.separatorContainer} />;

type ProductsSectionProps = {
  route: RouteProp<ParamListBase, keyof ParamListBase>;
  navigation: any;
};

const ProductsSection: React.FC<ProductsSectionProps> = props => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const category = props.route.name.toLowerCase();

  const {navigation} = props;

  useEffect(() => {
    fetch(offerProductsAPI).then(res => {
      res.json().then(data => {
        setOfferProducts(data);
      });
    });
    if (category !== 'man' && category !== 'woman' && category !== 'kids') {
      console.error('Invalid category');
      return;
    }
    const url = popularProductsAPI?.[category];
    fetch(url).then(res => {
      res.json().then(data => {
        setPopularProducts(data);
      });
    });
  }, [props.route.name, category]);

  const selectHandler = useCallback(
    (product: Product) => {
      navigation.navigate('product', {category, product});
    },
    [navigation, category],
  );
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.offerProductsContainer}>
        <FlatList
          data={offerProducts}
          renderItem={({item}) => <OfferProductView product={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.popularProductsContainer}>
        <Text style={styles.popularProductsTitle}>
          {PRODUCT_SECTION.MOST_POPULAR_PRODUCT}
        </Text>
        <View>
          <FlatList
            data={popularProducts}
            renderItem={({item}) => (
              <PopularProduct product={item} selectHandler={selectHandler} />
            )}
            horizontal={true}
            ItemSeparatorComponent={Separator}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: '99.5%',
  },
  productImageContainer: {
    borderRadius: 10,
  },
  offerProductsContainer: {
    paddingVertical: 30,
    paddingStart: 20,
    gap: 100,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY,
  },
  offerProductContainer: {
    width: 320,
    height: 400,
    marginRight: 20,
    shadowColor: DARK_GRAY,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  offerProductTextContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },
  discountText: {
    fontSize: 28,
    fontWeight: '900',
    color: WHITE,
    fontFamily: 'Poppins',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  discountCodeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  discount: {
    fontSize: 16,
    fontWeight: '500',
    color: WHITE,
    fontFamily: 'Poppins',
    paddingVertical: 20,
  },
  discountCode: {
    // textDecorationLine: 'underline',
    fontSize: 16,
    borderBottomColor: WHITE,
    borderBottomWidth: 1,
    color: WHITE,
    fontWeight: '600',
  },
  discountSlogan: {
    fontSize: 18,
    color: WHITE,
    fontWeight: '500',
  },
  popularProductsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  popularProductsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: BLACK,
    fontFamily: 'Poppins',
    marginBottom: 25,
  },
  popularProductImage: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
  separatorContainer: {
    height: 20,
    width: 20,
  },
});

export default ProductsSection;
