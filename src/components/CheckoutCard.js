import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import currencyFormat from '../helpers/currencyFormat';
import ItemCheckOut from './ItemCheckout';

export default function CheckoutCard({item}) {
  const {item: checkoutData} = item;
  const {
    store_name,
    total_price,
    delivery_fee,
    courier,
    service_name,
    items,
  } = checkoutData;

  return (
    <View style={card.parent}>
      <View style={card.textWrapper}>
        <Text style={card.key}>Store name: </Text>
        <Text style={card.value}>{store_name}</Text>
      </View>
      <View style={card.textWrapper}>
        <Text style={card.key}>Total price: </Text>
        <Text style={card.value}>{currencyFormat(total_price)}</Text>
      </View>
      <View style={card.textWrapper}>
        <Text style={card.key}>Delivery fee: </Text>
        <Text style={card.value}>{currencyFormat(delivery_fee)}</Text>
      </View>
      <View style={card.textWrapper}>
        <Text style={card.key}>Courier: </Text>
        <Text style={card.value}>{courier}</Text>
      </View>
      <View style={card.textWrapper}>
        <Text style={card.key}>Service name: </Text>
        <Text style={card.value}>{service_name}</Text>
      </View>
      <View style={card.itemWrapper}>
        {items && items.length
          ? items.map((itemData) => {
              return <ItemCheckOut item={{item: itemData}} />;
            })
          : null}
        {/* <FlatList
          item={items.length ? items : []}
          renderItem={(itemData) => {
            return <ItemCheckOut item={itemData} />;
          }}
        /> */}
      </View>
    </View>
  );
}

const card = StyleSheet.create({
  parent: {
    width: '100%',
    padding: 28,
    elevation: 3,
    marginVertical: 10,
    borderRadius: 8,
  },
  textWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  key: {
    color: '#457373',
    fontSize: 14,
    marginRight: 2,
  },
  value: {
    color: '#102526',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
});
