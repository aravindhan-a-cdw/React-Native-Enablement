import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BLACK, DARK_GRAY, SIZE_SELECTOR_BACKGROUND} from '../constants/color';
import {padding} from '../styles/common';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

type Props = {
  title: string;
  options: string[];
};

const Item = ({title}: {title: string}) => (
  <View>
    <Text style={styles.optionText}>{title}</Text>
  </View>
);

const ItemSeparator = () => <View style={styles.optionSeparator} />;

const ProductOptions: React.FC<Props> = ({options, title}) => {
  return (
    <View style={styles.optionContainer}>
      <Text style={styles.optionsTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.optionsContentContainer}
          data={options}
          renderItem={({item}) => <Item title={item} />}
          keyExtractor={item => item}
          ItemSeparatorComponent={ItemSeparator}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    ...padding(20, 20),
    flexDirection: 'row',
    gap: 40,
    backgroundColor: SIZE_SELECTOR_BACKGROUND,
  },
  optionsContentContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
  },
  optionsTitle: {
    fontSize: 17,
    color: DARK_GRAY,
    opacity: 0.6,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: BLACK,
    fontFamily: 'Poppins',
  },
  optionSeparator: {
    width: 30,
  },
});

export default ProductOptions;
