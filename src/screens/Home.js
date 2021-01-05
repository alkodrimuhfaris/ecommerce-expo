import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/HeaderHome';
import ProductCard from '../components/ProductCard';
import {useSelector, useDispatch} from 'react-redux';
import productActions from '../redux/actions/product';

export default function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(productActions.getNewItems());
    dispatch(productActions.getPopularItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newProduct = useSelector((state) => state.product.newProducts);
  const popularProduct = useSelector((state) => state.product.popularProducts);

  return (
    <SafeAreaView>
      <ScrollView vertical>
        <Header />

        <View style={styles.heading}>
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>New</Text>
            <Text style={styles.subtitle}>You'll never seen it before</Text>
          </View>
          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          data={newProduct}
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => {
            return (
              <View style={styles.cardWrap}>
                <ProductCard item={item} newProduct={true} />
              </View>
            );
          }}
        />

        <View style={styles.heading}>
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>Popular</Text>
            <Text style={styles.subtitle}>You'll never seen it before</Text>
          </View>
          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          data={popularProduct}
          renderItem={(item) => {
            return (
              <View style={styles.cardWrap}>
                <ProductCard item={item} />
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rightMargin: {
    marginRight: 4,
  },
  noRightMargin: {
    marginRight: 4,
    marginLeft: 4,
  },
  cardWrap: {
    marginHorizontal: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  wrapTitle: {
    flexDirection: 'column',
  },
  title: {
    color: '#102526',
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#9B9B9B',
    fontSize: 11,
  },
  viewAll: {
    color: '#102526',
  },
});
