const {EXPO_API_URL} = process.env;
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function ItemCheckOut({item}) {
  const {item: product} = item;
  const {name, product_image, item_detail} = product;
  let quantityArr = item_detail.map((productItem) => {
    productItem = productItem.quantity;
    return productItem;
  });
  let quantity = 0;
  quantityArr.forEach((qty) => (quantity += qty));

  return (
    <View style={itemStyle.parent}>
      <View style={itemStyle.imageWrapper}>
        <Image
          source={{
            uri: EXPO_API_URL + product_image,
          }}
          style={itemStyle.image}
        />
      </View>
      <View style={itemStyle.textWrapper}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={itemStyle.name}>
          {name}
        </Text>
        <Text style={itemStyle.quantity}>Quantity: {quantity}</Text>
      </View>
    </View>
  );
}

const itemStyle = StyleSheet.create({
  parent: {
    width: '100%',
    padding: 28,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  textWrapper: {
    width: '70%',
  },
  name: {
    color: '#102526',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantity: {
    color: '#102526',
    fontSize: 14,
  },
});
