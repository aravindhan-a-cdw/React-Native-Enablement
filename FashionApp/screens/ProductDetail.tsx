import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ProductDetail: React.FC = (props: any) => {
  const {
    route: {params},
    navigation,
  } = props;
  const {product} = params;
  console.log(product);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <View>
      <Text>
        Showing product id {product.id} for {params.category}
      </Text>
      <Image style={styles.image} source={{uri: product.modelImg}} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ProductDetail;
