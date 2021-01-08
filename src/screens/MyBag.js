/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, FlatList} from 'react-native';
import {Button} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import currencyFormat from '../helpers/currencyFormat';
import BookingCard from '../components/BookingCard';
import actions from '../redux/actions/index';
import ModalLoading from '../components/ModalLoading';
import ModalAlert from '../components/ModalAlert';
import loginFirst from '../assets/homePhotos/loginFirst.jpg';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

export default function MyBag() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {cartAction, checkoutAction} = actions;
  const [bookArray, setBookArray] = useState([]);
  const auth = useSelector((state) => state.auth);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const postCart = useSelector((state) => state.postCart);
  const token = useSelector((state) => state.auth.token);
  const getCart = useSelector((state) => state.getCart);
  const cartDelete = useSelector((state) => state.deleteCart);
  const [openAlert, setOpenAlert] = useState(false);
  const [propsAlert, setPropsAlert] = useState({});
  const [quantity, setQuantity] = useState([]);
  const [price, setPrice] = useState([]);

  // array for checkout
  const [sellerArr, setSellerArr] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [services, setServices] = useState([]);
  const [itemdetails_id, setItemdetails_id] = useState([]);
  const [checkoutArr, setCheckoutArr] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const initialMount = React.useRef(true);

  // get data cart
  useEffect(() => {
    if (isLogin) {
      dispatch(cartAction.getCart(token));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [token, postCart]);

  // setting up quantity, item price, array of cart id, array of seller id for checkout
  useEffect(() => {
    if (isLogin) {
      const {data} = getCart;
      const qty = data.map((item) => {
        item = item.quantity;
        return item;
      });
      const itemPrice = data.map((item) => {
        item = item.price;
        return item;
      });
      const slrArr = [
        ...new Set(
          data.map((item) => {
            item = item.seller_id;
            return item;
          }),
        ),
      ];
      const courierArr = sellerArr.map(() => '');
      const serviceArr = sellerArr.map(() => 0);
      const itemdetails_idArr = data.map((item) => {
        item = item.itemdetails_id;
        return item;
      });
      const checkoutDelArr = data.map((item) => {
        item = {
          id: item.id,
        };
        return item;
      });
      setQuantity(qty);
      setPrice(itemPrice);
      setSellerArr(slrArr);
      setCouriers(courierArr);
      setServices(serviceArr);
      setItemdetails_id(itemdetails_idArr);
      setCheckoutArr(checkoutDelArr);
    }
  }, [isLogin, getCart.data]);

  // change total price
  useEffect(() => {
    if (isLogin) {
      let totPrice = 0;
      if (quantity.length) {
        totPrice = [...quantity]
          .map((item, index) => {
            item = item * price[index];
            return item;
          })
          .reduce((a, b) => a + b);
      }
      setTotalPrice(totPrice);
      console.log(quantity);
      console.log(price);
    }
  }, [isLogin, quantity, getCart.data]);

  function nextPage() {
    console.log('next');
  }

  const deleteCart = (id, name, color) => {
    setPropsAlert({
      content: `Are you sure want to delete ${name} (${color}) from your carts?`,
      confirm: () => {
        dispatch(cartAction.deleteCart(token, [{id}]));
        setOpenAlert(false);
      },
      confirmText: 'Delete',
      discard: () => {
        setOpenAlert(false);
      },
      discardText: 'No',
    });
    setOpenAlert(true);
  };

  useEffect(() => {
    if (isLogin) {
      if (isFocused) {
        if (initialMount) {
          initialMount.current = false;
          dispatch(cartAction.getCart(token));
          dispatch(cartAction.celarStateDelete());
        } else {
          if (cartDelete.success) {
            setPropsAlert({
              content: 'Cart successfuly deleted!',
              confirm: () => {
                dispatch(cartAction.getCart(token));
                dispatch(cartAction.celarStateDelete());
                setOpenAlert(false);
              },
              useOneBtn: true,
            });
            setOpenAlert(true);
          } else if (cartDelete.error) {
            setPropsAlert({
              content: cartDelete.message,
              confirm: () => {
                dispatch(cartAction.getCart(token));
                dispatch(cartAction.celarStateDelete());
                setOpenAlert(false);
              },
              useOneBtn: true,
            });
            setOpenAlert(true);
          }
        }
      } else {
        initialMount.current = true;
        if (cartDelete.success) {
          dispatch(cartAction.getCart(token));
          dispatch(cartAction.celarStateDelete());
        }
      }
    }
  }, [isFocused, isLogin, cartDelete.pending]);

  const checkout = () => {
    const data = {
      couriers,
      services,
      itemdetails_id,
      quantity,
    };
    console.log(data);
    dispatch(cartAction.cartToCheckout(checkoutArr));
    dispatch(checkoutAction.addCheckoutData(data));
    navigation.navigate('CheckoutStack', {screen: 'Checkout'});
  };

  return (
    <View style={styles.container}>
      <ModalLoading modalOpen={getCart.pending || cartDelete.pending} />
      <ModalAlert modalOpen={openAlert} {...propsAlert} />
      {auth.isLogin ? (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>My Bag</Text>
          </View>

          {Object.keys(getCart.data).length ? (
            <View style={styles.viewScroll}>
              <FlatList
                data={Object.keys(getCart.data).length > 0 && getCart.data}
                showsVerticalScrollIndicator={false}
                onEndReached={nextPage}
                keyExtractor={(item) => item.index}
                onEndReachedTreshold={0.5}
                renderItem={(item) => {
                  return (
                    <BookingCard
                      item={item}
                      delCart={deleteCart}
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  );
                }}
              />
            </View>
          ) : (
            <View style={styles.viewScroll}>
              <Text style={styles.text}>
                Your bag is empty, start shopping!
              </Text>
            </View>
          )}

          <View style={styles.footer}>
            <View style={styles.totalWrap}>
              <Text style={styles.text}>Total amount</Text>
              <Text style={styles.total}>{currencyFormat(totalPrice)}</Text>
            </View>
            <View style={styles.parentBtn}>
              <Button
                onPress={checkout}
                disabled={!getCart.data.length}
                style={styles.btn}>
                <Text style={styles.btnTxt}>CHECK OUT</Text>
              </Button>
            </View>
          </View>
        </>
      ) : (
        <ImageBackground source={loginFirst} style={styles.loginContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleLogin}>Login to see content</Text>
          </View>
          <View style={styles.loginFooter}>
            <View style={styles.parentBtn}>
              <Button
                onPress={() =>
                  navigation.navigate('AuthStack', {screen: 'Login'})
                }
                style={styles.btn}>
                <Text style={styles.btnTxt}>Login</Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 50,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#102526',
  },
  titleLogin: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
  },
  viewScroll: {
    height: '65%',
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  wrapper: {
    paddingHorizontal: '5%',
  },
  loginContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
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
  loginFooter: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
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
