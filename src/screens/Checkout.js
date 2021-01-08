/* eslint-disable react-hooks/exhaustive-deps */
import {Button, CheckBox} from 'native-base';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import currencyFormat from '../helpers/currencyFormat';
import AddressCards from '../components/AddressCards';
import {FontAwesome5} from '@expo/vector-icons';
import CheckoutCard from '../components/CheckoutCard';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../redux/actions/index';
import tukuIcon from '../assets/icons/tukuIcon.png';
import ModalLoading from '../components/ModalLoading';
import {useNavigation} from '@react-navigation/native';
import ModalAlert from '../components/ModalAlert';

export default function Main() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const address_id = useSelector((state) => state.selectAddress.address_id);
  const detailAddress = useSelector(
    (state) => state.selectAddress.addressDetail,
  );
  const getAddress = useSelector((state) => state.getAddress);
  const checkoutData = useSelector((state) => state.checkoutData);
  const token = useSelector((state) => state.auth.token);
  const bookingSummary = useSelector(
    (state) => state.getCheckout.bookingSummary,
  );
  const bookingDetail = useSelector((state) => state.getCheckout.bookingDetail);
  const getCheckout = useSelector((state) => state.getCheckout);
  const deliveryOption = useSelector((state) => state.deliveryFees.data);
  const processPayment = useSelector((state) => state.processPayment);
  const cartSelected = useSelector(
    (state) => state.cartToCheckout.dataToDelete,
  );
  const userData = useSelector((state) => state.getProfile.userData);
  const deliveryFee = useSelector(
    (state) => state.setDeliveryServices.deliveryFee,
  );

  const [paymentSelected, setPaymentSelected] = React.useState(0);
  const {prices, delivery_fees, total} = bookingSummary;
  const [deliveryFeeInput, setDeliveryFeeInput] = React.useState([{}]);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [propsNotif, setPropsNotif] = React.useState({});
  const isInitialMount = React.useRef(true);
  const isInitialMount2 = React.useRef(true);

  React.useEffect(() => {
    if (Object.keys(userData).length) {
      dispatch(actions.profileAction.getProfile(token));
    }
  }, []);

  // automatically get checkout data
  React.useEffect(() => {
    const data = {...checkoutData};
    const {quantity, itemdetails_id} = data;
    if (quantity.length && itemdetails_id.length) {
      if (address_id) {
        Object.assign(data, {address_id});
      }
      dispatch(actions.checkoutAction.getCheckout(token, data));
    }
  }, [checkoutData]);

  // creating delivery fee array conditioner
  React.useEffect(() => {
    if (bookingDetail.length && !deliveryFee.length) {
      const valueDelivery = bookingDetail.map(() => ({}));
      const delivFee = bookingDetail.map((item) => {
        const {seller_id, items} = item;
        const itemdetails_id = [];
        const quantity = [];
        items.forEach((element) => {
          const {item_detail} = element;
          item_detail.forEach((elItemDetail) => {
            const {item_detail_id, quantity: quantityDetail} = elItemDetail;
            itemdetails_id.push(item_detail_id);
            quantity.push(quantityDetail);
          });
        });
        item = {
          seller_id,
          itemdetails_id,
          quantity,
        };
        return item;
      });
      setDeliveryFeeInput(delivFee);
      dispatch(actions.checkoutAction.setDeliveryService(valueDelivery));
    }
  }, [bookingDetail]);

  // get delivery fee but not when first mounting
  React.useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      if (deliveryFeeInput.length) {
        dispatch(
          actions.checkoutAction.getDeliveryFee(
            token,
            deliveryFeeInput,
            address_id,
          ),
        );
      }
    }
  }, [deliveryFeeInput, address_id]);

  // automatically get checkout data
  React.useEffect(() => {
    const data = {...checkoutData};
    const {quantity, itemdetails_id} = data;
    if (quantity.length && itemdetails_id.length) {
      if (address_id) {
        Object.assign(data, {address_id});
      }
      dispatch(actions.checkoutAction.getCheckout(token, data));
    }
  }, [checkoutData]);

  // function called just when update if selected address id
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const newDeliveryFee = [...deliveryFee].map(() => ({
        value: '',
        label: 'Choose one of delivery options bellow',
      }));

      dispatch(actions.checkoutAction.setDeliveryService(newDeliveryFee));
      const {quantity, itemdetails_id} = checkoutData;
      const dataAddressChange = {
        quantity,
        itemdetails_id,
      };
      if (quantity.length && itemdetails_id.length) {
        if (address_id) {
          Object.assign(dataAddressChange, {address_id});
        }
        dispatch(actions.checkoutAction.getCheckout(token, dataAddressChange));
      }
    }
  }, [address_id]);

  // get data address for the first time when element on mounting
  React.useEffect(() => {
    if (!getAddress.data.length) {
      dispatch(actions.addressAction.getAddress(token));
    }
  }, [token]);

  // set primary address as selected address when component mounting on the first time
  React.useEffect(() => {
    if (address_id === 0) {
      if (
        getAddress.success ||
        (Object.keys(detailAddress).length && getAddress.data.length)
      ) {
        const primaryAddress = getAddress.data[0];
        console.log(getAddress.data);
        dispatch(actions.addressAction.selectAddress(primaryAddress));
      }
    }
  }, [getAddress.pending]);

  // set delivery fee and input of delivery fee when booking detail is changing
  React.useEffect(() => {
    if (bookingDetail.length && !deliveryFee.length) {
      const valueDelivery = bookingDetail.map(() => ({}));
      const delivFee = bookingDetail.map((item) => {
        const {seller_id, items} = item;
        const itemdetails_id = [];
        const quantity = [];
        items.forEach((element) => {
          const {item_detail} = element;
          item_detail.forEach((elItemDetail) => {
            const {item_detail_id, quantity: quantityDetail} = elItemDetail;
            itemdetails_id.push(item_detail_id);
            quantity.push(quantityDetail);
          });
        });
        item = {
          seller_id,
          itemdetails_id,
          quantity,
        };
        return item;
      });
      setDeliveryFeeInput(delivFee);
      dispatch(actions.checkoutAction.setDeliveryService(valueDelivery));
    }
  }, [bookingDetail]);

  // set notif after doing payment
  React.useEffect(() => {
    if (processPayment.success) {
      setPropsNotif({
        content: processPayment.message,
        useOneBtn: true,
        confirm: () => {
          dispatch(actions.checkoutAction.removeNotifCheckout());
          dispatch(actions.checkoutAction.removeCheckoutData());
          if (cartSelected.length) {
            dispatch(actions.cartAction.deleteCart(token, cartSelected));
          }
          setOpenNotif(false);
          navigation.navigate('TransactionStack', {screen: 'MyOrder'});
        },
      });
      setOpenNotif(true);
    } else if (processPayment.error) {
      setPropsNotif({
        content: processPayment.message,
        useOneBtn: true,
        confirm: () => {
          dispatch(actions.checkoutAction.removeNotifCheckout());
          setOpenNotif(false);
        },
      });
      setOpenNotif(true);
    }
  }, [processPayment.pending]);

  const paymentMethod = [
    {
      name: 'Tuku Payment',
      payment_method: 'tuku_payment',
      icon: tukuIcon,
    },
  ];

  const processToPayment = () => {
    console.log(checkoutData);
    const {payment_method} = paymentMethod[paymentSelected];
    const data = {...checkoutData, payment_method, address_id};
    console.log(data);
    dispatch(actions.checkoutAction.processPayment(token, data));
  };

  const submitOrder = () => {
    if (Number(total)) {
      setPropsNotif({
        content: `Checkout items for ${currencyFormat(total)} by ${
          paymentMethod[paymentSelected].name
        } and send to ${detailAddress.address_name}?${
          paymentMethod[paymentSelected].payment_method === 'tuku_payment'
            ? ` (Your current balance is ${currencyFormat(userData.balance)})`
            : ''
        }`,
        confirm: () => {
          processToPayment();
          setOpenNotif(false);
        },
        discard: () => {
          setOpenNotif(false);
        },
        confirmText: 'Proceed',
      });
      setOpenNotif(true);
    } else {
      setPropsNotif({
        content: 'Select courier and service!',
        useOneBtn: true,
        confirm: () => {
          setOpenNotif(false);
        },
      });
      setOpenNotif(true);
    }
  };

  // function to select delivery courier
  const selectDeliveryCourier = (value, index) => {
    const {services: serviceArr, couriers: courierArr} = checkoutData;
    serviceArr[index] = value.service_id;
    courierArr[index] = value.courier;
    const data = {
      ...checkoutData,
      services: serviceArr,
      couriers: courierArr,
    };
    const delivFee = [...deliveryFee];
    delivFee[index] = value;
    dispatch(actions.checkoutAction.setDeliveryService(delivFee));
    dispatch(actions.checkoutAction.addCheckoutData(data));
  };

  return (
    <View style={styles.parentContainer}>
      <ModalLoading modalOpen={processPayment.pending} />
      <ModalAlert modalOpen={openNotif} {...propsNotif} />
      <View style={styles.parent}>
        <ScrollView style={styles.parentWrapper}>
          <View style={styles.addressWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Shipping Address</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.addressCardContainer}>
                {Object.keys(detailAddress).length ? (
                  <AddressCards item={{item: detailAddress}} checkout />
                ) : (
                  <View style={styles.loadingWrapper}>
                    <ActivityIndicator
                      visible={!Object.keys(detailAddress).length}
                      size="small"
                      color="#457373"
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          <View style={styles.checkoutWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Checkout Items</Text>
            </View>
            {bookingDetail && bookingDetail.length && !getCheckout.pending ? (
              // bookingDetail.map((item) => {
              //   return <CheckoutCard item={{item}} />;
              // })
              <FlatList
                data={bookingDetail ? bookingDetail : []}
                keyExtractor={(item) => item.index}
                renderItem={(item) => {
                  let delivOpt = [
                    {
                      value: '',
                      label: 'Choose one of delivery options bellow',
                    },
                  ];
                  if (deliveryOption.length) {
                    for (const options of deliveryOption) {
                      const {seller_id, dataDelivery} = options;
                      console.log(item.seller_id);
                      if (seller_id === item.item.seller_id) {
                        delivOpt = dataDelivery.map((deliveryItem) => {
                          const {courier, etd, price, service} = deliveryItem;
                          const value = deliveryItem;
                          const label =
                            `${courier}-${service} || ` +
                            `${currencyFormat(price)}`;
                          const servicePrice = currencyFormat(price);
                          deliveryItem = {
                            value,
                            label,
                            service: `${courier} || ${service}`,
                            etd: `${etd} hari`,
                            servicePrice,
                          };
                          return deliveryItem;
                        });
                      }
                    }
                  }
                  return (
                    <CheckoutCard
                      item={item}
                      delivOpt={delivOpt}
                      defaultValue={deliveryFee[item.index]}
                      onChange={(e) => selectDeliveryCourier(e, item.index)}
                    />
                  );
                }}
              />
            ) : (
              <View style={styles.loadingWrapper}>
                <ActivityIndicator
                  visible={!Object.keys(detailAddress).length}
                  size="small"
                  color="#457373"
                />
              </View>
            )}
          </View>

          <View style={styles.paymentWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Payment Method</Text>
            </View>
            <FlatList
              data={paymentMethod}
              keyExtractor={(item) => item.index}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.methodPaymentWrapper}>
                    <View style={styles.iconWrapper}>
                      <View style={styles.imagePaymentWrapper}>
                        <Image source={item.icon} style={styles.iconPayment} />
                      </View>
                      <Text style={styles.iconText}>{item.name}</Text>
                    </View>
                    <View style={styles.checkBoxWrapper}>
                      <CheckBox
                        checked={index === paymentSelected}
                        onPress={() => setPaymentSelected(index)}
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
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
          <Text style={styles.priceTotal}>
            {Number(total) ? currencyFormat(total) : total}
          </Text>
        </View>
        <Button onPress={submitOrder} rounded block style={styles.btn}>
          <Text style={styles.btnTxt}>Submit Order</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    position: 'relative',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  parent: {
    position: 'relative',
    width: '100%',
    height: '75%',
    alignItems: 'center',
  },
  parentWrapper: {
    width: '100%',
  },
  titleContainer: {
    marginTop: 50,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: '5%',
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#102526',
  },
  addressWrapper: {
    width: '100%',
    marginVertical: 20,
  },
  titleWrapper: {
    width: '100%',
    paddingHorizontal: '5%',
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
    marginVertical: 20,
  },
  paymentWrapper: {
    width: '100%',
    paddingHorizontal: '5%',
    marginVertical: 20,
  },
  methodPaymentWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagePaymentWrapper: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  iconPayment: {
    width: 50,
    aspectRatio: 1,
    resizeMode: 'contain',
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
    width: '100%',
    flexDirection: 'column',
    height: '25%',
    backgroundColor: '#457373',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: '5%',
    elevation: 2,
  },
  summaryWrapper: {
    marginBottom: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryTxt: {
    fontSize: 14,
    color: 'white',
  },
  priceTotal: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: 'white',
    marginTop: 5,
    padding: 10,
  },
  btnTxt: {
    color: '#9B8148',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
