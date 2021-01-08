import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import currencyFormat from '../helpers/currencyFormat';
import moment from 'moment';

export default function OrderCard({item, idSelect}) {
  const {item: transactionDetail} = item;
  const {
    id,
    invoice,
    created_at,
    delivery_fee,
    items_price,
    status,
  } = transactionDetail;

  const goToId = () => {
    idSelect(id);
  };

  return (
    <View style={orderStyle.parent}>
      <TouchableOpacity onPress={goToId} style={orderStyle.card}>
        <View style={orderStyle.wrapperCard}>
          <Text style={orderStyle.date}>
            {moment(created_at).format('MMM DD, YYYY')}
          </Text>
          <View style={orderStyle.invoiceWrap}>
            <Text style={orderStyle.invoice} numberOfLines={1}>
              Invoice: {invoice}
            </Text>
          </View>
          {/* <View style={orderStyle.subWrapper}>
            <Text style={orderStyle.key}>Tracking Number:</Text>
            <Text style={orderStyle.value}>{'#'}</Text>
          </View> */}
          <View style={orderStyle.subWrapper}>
            <Text style={orderStyle.key}>Total Price:</Text>
            <Text style={orderStyle.value}>{currencyFormat(items_price)}</Text>
          </View>
          <View style={orderStyle.subWrapper}>
            <Text style={orderStyle.key}>Delivery fee:</Text>
            <Text style={orderStyle.value}>{currencyFormat(delivery_fee)}</Text>
          </View>
          <View style={orderStyle.deliveredWrap}>
            <Text style={status ? orderStyle.paid : orderStyle.notPaid}>
              {status ? 'Paid' : 'Not Paid'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const orderStyle = StyleSheet.create({
  parent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    elevation: 3,
    borderRadius: 8,
    padding: 28,
    backgroundColor: 'white',
  },
  wrapperCard: {
    width: '100%',
  },
  invoiceWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoice: {
    flexWrap: 'wrap',
    fontSize: 14,
    color: '#102526',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#5A6868',
    textAlign: 'right',
    marginBottom: 10,
  },
  subWrapper: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  key: {
    fontSize: 14,
    color: '#5A6868',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#102526',
    marginLeft: 10,
  },
  paid: {
    fontSize: 14,
    color: '#457373',
  },
  notPaid: {
    fontSize: 14,
    color: '#7C4935',
  },
  deliveredWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
