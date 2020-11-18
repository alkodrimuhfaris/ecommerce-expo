import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Container, Button} from 'native-base';
import currencyFormat from '../helpers/currencyFormat';
import BookingCard from '../components/BookingCard';

const bookingData = [
  {
    detail_id: 1,
    product_image:
      'https://i.pinimg.com/originals/ac/d5/7b/acd57b7e53a6be7134a4192ed21c0872.jpg',
    color_name: 'brown',
    size: 'L',
    price: 30000,
    quantity: 1,
  },
  {
    detail_id: 2,
    product_image:
      'https://i.pinimg.com/originals/ac/d5/7b/acd57b7e53a6be7134a4192ed21c0872.jpg',
    color_name: 'brown',
    size: 'L',
    price: 30000,
    quantity: 1,
  },
  {
    detail_id: 3,
    product_image:
      'https://i.pinimg.com/originals/ac/d5/7b/acd57b7e53a6be7134a4192ed21c0872.jpg',
    color_name: 'brown',
    size: 'L',
    price: 30000,
    quantity: 1,
  },
  {
    detail_id: 4,
    product_image:
      'https://i.pinimg.com/originals/ac/d5/7b/acd57b7e53a6be7134a4192ed21c0872.jpg',
    color_name: 'brown',
    size: 'L',
    price: 30000,
    quantity: 1,
  },
];

export default function MyBag() {
  const dataCart = {bookingData};
  const [bookArray, setBookArray] = useState([]);

  const [prices, setPrices] = useState(bookArray.map((item) => item.price));

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    Object.keys(dataCart).length &&
      setBookArray(
        dataCart.bookingData.map((item) => {
          const {quantity, price, detail_id} = item;
          return {quantity, price: quantity * price, detail_id};
        }),
      );
    // bookArray.length && setPrices(bookArray.map((item) => item.price));
    // let tot = 0;
    // prices.length && prices.forEach((item) => (tot += item));
    // setTotalPrice(tot);
    // tot = 0;
    console.log('this is when mounting');
  }, [bookArray]);

  function update(index, detail_id, quantity, price) {
    console.log(bookArray);
    setBookArray((prevArr) => {
      console.log(prevArr);
      return prevArr.map((item, i) => {
        item = i === index ? {detail_id, quantity, price} : item;
        return item;
      });
    });
    console.log('this changes book array');
  }

  useEffect(() => {
    console.log('book array is changenging');
    bookArray.length && setPrices(bookArray.map((item) => item.price));
  }, [bookArray]);

  useEffect(() => {
    console.log('price is changenging');
    let tot = 0;
    prices.length && prices.forEach((item) => (tot += item));
    setTotalPrice(tot);
    tot = 0;
  }, [prices]);

  function nextPage() {
    console.log('next');
  }

  return (
    <Container style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Bag</Text>
      </View>

      <View style={styles.viewScroll}>
        <FlatList
          data={Object.keys(dataCart).length > 0 && dataCart.bookingData}
          onEndReached={nextPage}
          onEndReachedTreshold={0.5}
          renderItem={(item) => {
            return <BookingCard item={item} updateSet={update} />;
          }}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.totalWrap}>
          <Text style={styles.text}>Total amount</Text>
          <Text style={styles.total}>{currencyFormat(totalPrice)}</Text>
        </View>
        <View style={styles.parentBtn}>
          <Button style={styles.btn}>
            <Text style={styles.btnTxt}>CHECK OUT</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 70,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#102526',
  },
  viewScroll: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  wrapper: {
    paddingHorizontal: '5%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#E5e5e5',
  },
  text: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    color: '#9B9B9B',
    textAlign: 'center',
  },
  topMargin: {
    marginTop: 5,
  },
  noTopMargin: {
    marginTop: 5,
    marginBottom: 5,
  },
  footer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  parentBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 100,
    padding: 5,
    width: 350,
    justifyContent: 'center',
    backgroundColor: '#457373',
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  totalWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
