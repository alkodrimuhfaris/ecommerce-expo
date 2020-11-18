import {Button, CheckBox} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import currencyFormat from '../helpers/currencyFormat';
import AddressCards from '../components/AddressCards';
import {FontAwesome5} from '@expo/vector-icons';
import CheckoutCard from '../components/CheckoutCard';

const data = [
  {
    id: 2,
    user_id: 3,
    address_name: 'Home',
    primary_address: 1,
    recipient_name: 'Marzuki',
    phone: '089633449007',
    city: 'Tangerang',
    city_type: 'Kota',
    province_id: 3,
    city_id: 456,
    address: 'Gang H. Samir No 76 B, Karang Timur, Karang Tengah, Tangerang',
    postal_code: 14321,
    maps_pin_point: null,
    created_at: '2020-10-30T01:29:18.000Z',
    updated_at: '2020-11-18T01:32:33.000Z',
  },
];

const bookingData = {
  bookingSummary: {
    prices: 1850000,
    delivery_fees: 93000,
    total: 1943000,
  },
  bookingDetail: [
    {
      seller_id: 2,
      weight: 4100,
      store_name: 'Arsenal Clothes',
      origin: 327,
      destination: 456,
      total_price: 1550000,
      delivery_fee: 76000,
      courier: 'jne',
      service_name: 'REG',
      items: [
        {
          item_id: 1,
          name: "Illi London Woman's Maxi Dress",
          product_image: 'Uploads/2-product_image-1603966940378.jpg',
          item_price: 1050000,
          item_detail: [
            {
              item_detail_id: 1,
              color_name: 'black',
              price: 300000,
              quantity: 2,
            },
            {
              item_detail_id: 2,
              color_name: 'pista',
              price: 300000,
              quantity: 2,
            },
            {
              item_detail_id: 3,
              color_name: 'pink',
              price: 450000,
              quantity: 3,
            },
          ],
        },
        {
          item_id: 3,
          name: 'Kemeja Pria SlimFit Lengan Panjang Warna Peach Oxford',
          product_image: 'Uploads/2-product_image-1605664700755.jpeg',
          item_price: 500000,
          item_detail: [
            {
              item_detail_id: 9,
              color_name: 'maroon',
              price: 500000,
              quantity: 2,
            },
          ],
        },
      ],
    },
    {
      seller_id: 6,
      weight: 800,
      store_name: 'Gamis Mutiara',
      origin: 419,
      destination: 456,
      total_price: 300000,
      delivery_fee: 17000,
      courier: 'jne',
      service_name: 'REG',
      items: [
        {
          item_id: 2,
          name: 'BAJU GAMIS WANITA IH ARAFAH',
          product_image: 'Uploads/6-product_image-1605658350242.jpeg',
          item_price: 300000,
          item_detail: [
            {
              item_detail_id: 5,
              color_name: 'black',
              price: 300000,
              quantity: 2,
            },
          ],
        },
      ],
    },
  ],
};

export default function Main() {
  const addressDetail = data;
  const bookingDatas = bookingData;
  const {bookingSummary, bookingDetail} = bookingDatas;
  const [detailAddress] = addressDetail;
  const [paymentMethod, setPaymentMethod] = React.useState('later');
  const [checkedPayment, setCheckedPayment] = React.useState(false);
  const {prices, delivery_fees, total} = bookingSummary;

  const goToSelectAddress = () => {
    console.log('select address');
  };

  const selectTukuPayment = () => {
    setCheckedPayment(!checkedPayment);
  };

  React.useEffect(() => {
    checkedPayment
      ? setPaymentMethod('tuku_payment')
      : setPaymentMethod('later');
  }, [checkedPayment]);

  React.useEffect(() => {
    console.log(paymentMethod);
  }, [paymentMethod]);

  return (
    <View style={styles.parent}>
      <ScrollView style={styles.parentWrapper}>
        <View style={styles.addressWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Shipping Address</Text>
          </View>
          <ScrollView>
            <View style={styles.addressCardContainer}>
              <AddressCards
                item={{item: detailAddress}}
                changeAddress={goToSelectAddress}
              />
            </View>
          </ScrollView>
        </View>

        <View style={styles.checkoutWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Checkout Items</Text>
          </View>
          {bookingDetail && bookingDetail.length
            ? bookingDetail.map((item) => {
                return <CheckoutCard item={{item}} />;
              })
            : null}
          {/* <FlatList
            horizontal
            item={bookingDetail ? bookingDetail : []}
            renderItem={(item) => {
              return <CheckoutCard item={item} />;
            }}
          /> */}
        </View>

        <View style={styles.paymentWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Payment Method</Text>
          </View>
          <View style={styles.methodPaymentWrapper}>
            <View style={styles.iconWrapper}>
              <FontAwesome5 name="money-check-alt" size={12} color="black" />
              <Text style={styles.iconText}>Tuku Payment</Text>
            </View>
            <View style={styles.checkBoxWrapper}>
              <CheckBox checked={checkedPayment} onPress={selectTukuPayment} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.summaryWrapper}>
          <Text style={styles.summaryTxt}>Order:</Text>
          <Text style={styles.priceTotal}>{currencyFormat(prices)}</Text>
        </View>
        <View style={styles.summaryWrapper}>
          <Text style={styles.summaryTxt}>Delivery:</Text>
          <Text style={styles.priceTotal}>{currencyFormat(delivery_fees)}</Text>
        </View>
        <View style={styles.summaryWrapper}>
          <Text style={styles.summaryTxt}>Summary:</Text>
          <Text style={styles.priceTotal}>{currencyFormat(total)}</Text>
        </View>
        <Button rounded block style={styles.btn}>
          <Text style={styles.btnTxt}>Submit Order</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    position: 'relative',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  parentWrapper: {
    width: '100%',
  },
  addressWrapper: {
    width: '100%',
    paddingHorizontal: '5%',
    marginVertical: 20,
  },
  titleWrapper: {
    width: '100%',
    marginVertical: 5,
  },
  title: {
    color: '#102526',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressCardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  checkoutWrapper: {
    width: '100%',
    paddingHorizontal: '5%',
    marginVertical: 20,
  },
  paymentWrapper: {
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: 20,
    marginBottom: '50%',
  },
  methodPaymentWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 10,
  },
  checkBoxWrapper: {
    width: '10%',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    zIndex: 2,
    bottom: 0,
    height: '25%',
    backgroundColor: '#EEE',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: '5%',
  },
  summaryWrapper: {
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryTxt: {
    fontSize: 12,
    color: '#5A6868',
  },
  priceTotal: {
    fontSize: 12,
    color: '#102526',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#457373',
    padding: 10,
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
