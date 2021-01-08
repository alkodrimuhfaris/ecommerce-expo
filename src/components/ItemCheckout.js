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
        <View style={itemStyle.itemTextWrapper}>
          <Text
            style={itemStyle.quantity}
            numberOfLines={2}
            ellipsizeMode="tail">
            Color:
          </Text>
          <Text
            style={itemStyle.txtQuantity}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.item_detail
              ? ''
              : !item_detail.length
              ? ''
              : item_detail
                  .map((elementItemDetail) => {
                    elementItemDetail = `${elementItemDetail.color_name}(${elementItemDetail.quantity})`;
                    return elementItemDetail;
                  })
                  .join(', ')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const itemStyle = StyleSheet.create({
  parent: {
    width: '100%',
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 10,
  },
  image: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 8,
  },
  textWrapper: {
    width: '70%',
  },
  itemTextWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  name: {
    color: '#102526',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantity: {
    color: '#457373',
    fontSize: 14,
    marginRight: 5,
  },
  txtQuantity: {
    flex: 1,
    color: '#102526',
  },
});
