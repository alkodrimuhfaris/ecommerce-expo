import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import OrderCard from '../components/TransactionCard';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../redux/actions/index';
import queryExtractor from '../helpers/queryExtractor';

export default function ViewOrder({navigation}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const transactions = useSelector(
    (state) => state.allTransaction.transactions,
  );
  const pageInfo = useSelector((state) => state.allTransaction.pageInfo);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    dispatch(actions.transactionAction.getAllTransaction(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextPage = () => {
    const nextQuery = queryExtractor(pageInfo);
    if (nextQuery) {
      dispatch(
        actions.transactionAction.scrollAllTransaction(token, nextQuery),
      );
    }
  };

  const goToId = (id) => {
    dispatch(actions.transactionAction.getTransactionById(token, id));
    navigation.navigate('TransactionStack', {screen: 'OrderDetail'});
  };

  const doRefresh = () => {
    setRefresh(true);
    dispatch(actions.transactionAction.getAllTransaction(token));
    setRefresh(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.orderArrWrap}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transactions}
          refreshing={refresh}
          onRefresh={doRefresh}
          onEndReached={nextPage}
          style={styles.flatListStyle}
          keyExtractor={(item) => item.index}
          onEndReachedTreshold={0.1}
          renderItem={(item) => {
            const {index} = item;
            return (
              <View
                style={
                  index === transactions.length - 1 ? styles.endData : null
                }>
                <OrderCard item={item} idSelect={goToId} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#102526',
  },
  orderArrWrap: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flatListStyle: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  endData: {
    marginBottom: 30,
  },
});
