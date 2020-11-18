import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {Container} from 'native-base';
import OrderCard from '../components/TransactionCard';

const transaction = [
  {
    id: 8,
    user_id: 3,
    invoice: 'TUKU316042498505034E42D0B1',
    items_price: 900000,
    delivery_fee: 57000,
    additional_fee: null,
    total_price: 957000,
    status: 1,
    created_at: '2020-11-01T16:57:28.000Z',
  },
  {
    id: 7,
    user_id: 3,
    invoice: 'TUKU316042490890964CF3CC16',
    items_price: 900000,
    delivery_fee: 57000,
    additional_fee: null,
    total_price: 957000,
    status: 1,
    created_at: '2020-11-01T16:44:46.000Z',
  },
];

export default function ViewOrder() {
  const transactions = transaction;

  const nextPage = () => {
    console.log('to the new page');
  };

  const goToId = (id) => {
    console.log(id);
  };

  return (
    <Container style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>My Order</Text>
      </View>

      <View style={styles.orderArrWrap}>
        <FlatList
          data={transactions.length ? transactions : []}
          onEndReached={nextPage}
          onEndReachedTreshold={0.5}
          renderItem={(item) => {
            return <OrderCard item={item} idSelect={goToId} />;
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleWrapper: {
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: 50,
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#102526',
  },
  orderArrWrap: {
    width: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'column',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});
