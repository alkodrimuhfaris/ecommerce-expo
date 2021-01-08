import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import currencyFormat from '../helpers/currencyFormat';
import ItemCheckOut from './ItemCheckout';
import Picker from './picker/Picker';

export default function CheckoutCard({
  item,
  delivOpt = [],
  onChange,
  defaultValue,
}) {
  const {item: checkoutData} = item;
  const {
    store_name,
    total_price,
    delivery_fee,
    courier,
    service_name,
    items,
    total_payment,
  } = checkoutData;

  return (
    <View style={card.container}>
      <View style={card.parent}>
        <View style={card.textWrapper}>
          <Text style={card.key}>Store name: </Text>
          <Text style={card.value}>{store_name}</Text>
        </View>
        <View style={card.textWrapper}>
          <Text style={card.key}>Products price: </Text>
          <Text style={card.value}>
            {Number(total_price) ? currencyFormat(total_price) : total_price}
          </Text>
        </View>
        {Number(delivery_fee) ? (
          <>
            <View style={card.textWrapper}>
              <Text style={card.key}>Delivery fee: </Text>
              <Text style={card.value}>
                {Number(delivery_fee)
                  ? currencyFormat(delivery_fee)
                  : delivery_fee}
              </Text>
            </View>
            <View style={card.textWrapper}>
              <Text style={card.key}>Courier: </Text>
              <Text style={card.value}>{courier}</Text>
            </View>
            <View style={card.textWrapper}>
              <Text style={card.key}>Service name: </Text>
              <Text style={card.value}>{service_name}</Text>
            </View>
          </>
        ) : null}
        <View style={card.textWrapper}>
          <Text style={card.key}>Select courier and service:</Text>
        </View>
        <View style={card.selectionWrapper}>
          <Picker
            onChange={(e) => onChange(e)}
            displayLabelStyle={card.value}
            data={delivOpt}
            defaultValue={defaultValue}
            containerStyle={card.containerStyle}
          />
        </View>
        <View style={card.itemWrapper}>
          {items && items.length
            ? items.map((itemData, index) => {
                return <ItemCheckOut key={index} item={{item: itemData}} />;
              })
            : null}
        </View>
      </View>
    </View>
  );
}

const card = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%',
  },
  parent: {
    width: '100%',
    padding: 28,
    elevation: 4,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: 'white',
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
  containerStyle: {
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 5,
    backgroundColor: 'white',
    elevation: 2,
  },
});
