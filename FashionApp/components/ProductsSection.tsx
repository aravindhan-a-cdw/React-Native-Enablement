import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {offerProductsAPI, popularProductsAPI} from '../constants/api';

const OfferProductView = (props: any) => {
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
          <Text style={styles.discount}>
            Use code :{' '}
            <Text style={styles.discountCode}>{product.discountCode}</Text>
          </Text>
          <Text style={styles.discountSlogan}>{product.discountSlogan}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const PopularProduct = (props: any) => {
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

const ProductsSection: React.FC = (props: any) => {
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
    console.log(category);
    const url = popularProductsAPI[category];
    fetch(url).then(res => {
      res.json().then(data => {
        setPopularProducts(data);
      });
    });
  }, [props.route.name]);

  const selectHandler = (product: any) => {
    navigation.navigate('product', {category, product});
  };

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
        <Text style={styles.popularProductsTitle}>Most Popular Product</Text>
        <View>
          <FlatList
            data={popularProducts}
            renderItem={({item}) => (
              <PopularProduct product={item} selectHandler={selectHandler} />
            )}
            horizontal={true}
            ItemSeparatorComponent={() => (
              <View style={{height: 20, width: 20}} />
            )}
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
    height: '100%',
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
    backgroundColor: '#EAEAEA',
  },
  offerProductContainer: {
    width: 300,
    height: 430,
    marginRight: 20,
  },
  offerProductTextContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },
  discountText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    fontFamily: 'Poppins',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  discount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Poppins',
    paddingVertical: 20,
  },
  discountCode: {
    textDecorationLine: 'underline',
    color: '#fff',
    fontWeight: '600',
  },
  discountSlogan: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  popularProductsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  popularProductsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 25,
  },
  popularProductImage: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
});

export default ProductsSection;
