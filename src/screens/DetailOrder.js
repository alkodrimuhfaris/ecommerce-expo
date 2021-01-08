import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import ModalAlert from '../components/ModalAlert';
import ModalLoading from '../components/ModalLoading';
import actions from '../redux/actions';
import currencyFormat from '../helpers/currencyFormat';
import moment from 'moment';
import {Entypo} from '@expo/vector-icons';

export default function DetailOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const detailTransaction = useSelector((state) => state.detailTransaction);
  const data = useSelector((state) => state.detailTransaction.data);
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.getProfile.userData);
  const payTransaction = useSelector((state) => state.payTransaction);
  const [merchantTransaction, setMerchantTransaction] = React.useState([]);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [propsAlert, setPropsAlert] = React.useState({});

  React.useEffect(() => {
    const {transactionMerchants} = data;
    if (transactionMerchants) {
      setMerchantTransaction(transactionMerchants);
    }
  }, [data]);

  React.useEffect(() => {
    if (payTransaction.success || payTransaction.error) {
      setPropsAlert({
        content: payTransaction.message,
        confirm: () => {
          dispatch(actions.transactionAction.clearNotifTransaction());
          dispatch(actions.profileAction.getProfile(token));
          dispatch(actions.transactionAction.getAllTransaction(token));
          dispatch(
            actions.transactionAction.getTransactionById(token, data.id),
          );
          setOpenAlert(false);
        },
        useOneBtn: true,
      });
      setOpenAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payTransaction.pending]);

  const giveFeedBack = () => {
    console.log('giveFeedBack');
  };

  const commitPayment = () => {
    console.log('coba');
    if (userData.balance >= Number(data.total_price)) {
      setPropsAlert({
        content: `Commit payment for ${currencyFormat(data.total_price)}?`,
        confirm: () => {
          dispatch(actions.transactionAction.payTransaction(token, data.id));
          setOpenAlert(false);
        },
        discard: () => {
          setOpenAlert(false);
        },
      });
      setOpenAlert(true);
    } else {
      setPropsAlert({
        content: 'Your balance is low, top up your balance',
        confirm: () => {
          setOpenAlert(false);
          navigation.navigate('TransactionStack', {screen: 'TopUp'});
        },
        confirmText: 'Top Up',
        discard: () => {
          setOpenAlert(false);
        },
      });
      setOpenAlert(true);
    }
  };

  return (
    <View style={styles.parent}>
      <ModalLoading
        modalOpen={detailTransaction.pending || payTransaction.pending}
      />
      <ModalAlert modalOpen={openAlert} {...propsAlert} />
      {!detailTransaction.pending ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.parentScroll}>
          <View style={[styles.cardWrapper, styles.marginTop]}>
            <View style={styles.invoiceWrapper}>
              <Text numberOfLines={1} style={styles.key}>
                Invoice
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.value}>
                {data.invoice}
              </Text>
            </View>
          </View>
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <Text style={styles.summaryText}>Summary</Text>
              <View style={styles.upperSummary}>
                <View style={[styles.invoiceWrapper, styles.textMargin]}>
                  <Text numberOfLines={1} style={styles.keySmall}>
                    Transaction Date
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.valueSmall}>
                    {moment(data.createdAt).format('ddd, MMM Do YYYY')}
                  </Text>
                </View>
                <View style={[styles.invoiceWrapper, styles.textMargin]}>
                  <Text numberOfLines={1} style={styles.keySmall}>
                    Status
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      styles.valueSmall,
                      data.status ? styles.paid : styles.unpaid,
                    ]}>
                    {data.status ? 'Paid' : 'Unpaid'}
                  </Text>
                </View>
                <View style={[styles.invoiceWrapper, styles.textMargin]}>
                  <Text numberOfLines={1} style={styles.keySmall}>
                    Quantity
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.valueSmall}>
                    {data.quantity}
                  </Text>
                </View>
                <View style={[styles.invoiceWrapper, styles.textMargin]}>
                  <Text numberOfLines={1} style={styles.keySmall}>
                    Total Order
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.valueSmall}>
                    {currencyFormat(data.items_price)}
                  </Text>
                </View>
                <View style={[styles.invoiceWrapper, styles.textMargin]}>
                  <Text numberOfLines={1} style={styles.keySmall}>
                    Delivery
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.valueSmall}>
                    {currencyFormat(data.delivery_fee)}
                  </Text>
                </View>
              </View>
              <View style={[styles.invoiceWrapper, styles.textMargin]}>
                <Text numberOfLines={1} style={[styles.keySmall, styles.bold]}>
                  Shopping summary
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.valueSmall}>
                  {currencyFormat(data.total_price)}
                </Text>
              </View>
            </View>
          </View>
          {merchantTransaction.map((item, index) => {
            const {transactionDetails: itemDetail} = item;
            return (
              <View
                style={[
                  styles.cardWrapper,
                  index === merchantTransaction.length - 1
                    ? styles.marginBottomFar
                    : null,
                ]}>
                <View style={styles.card}>
                  <Text style={styles.summaryText}>{item.store_name}</Text>
                  {itemDetail.map((detail) => {
                    return (
                      <View style={styles.itemDetailWrapper}>
                        <View style={styles.imageWrapper}>
                          <Image
                            source={{
                              uri:
                                process.env.EXPO_API_URL + detail.product_image,
                            }}
                            style={styles.imageDetail}
                          />
                        </View>
                        <View style={styles.detailNameWrapper}>
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.itemName}>
                            {detail.item_name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.itemColor}>
                            {detail.item_color}
                          </Text>
                        </View>
                        <View style={styles.detailQuantity}>
                          <Entypo name="cross" size={12} color="#102526" />
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.itemName}>
                            {detail.quantity}
                          </Text>
                        </View>
                        <View style={styles.priceItem}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.itemName}>
                            {currencyFormat(detail.total_price)}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                  <View style={[styles.invoiceWrapper, styles.textMargin]}>
                    <Text numberOfLines={1} style={styles.keySmall}>
                      Shipping Address
                    </Text>
                    <Text style={styles.valueSmall}>
                      {item.shipping_address}
                    </Text>
                  </View>
                  <View style={[styles.invoiceWrapper, styles.textMarginFar]}>
                    <Text numberOfLines={1} style={styles.keySmall}>
                      Delivery Service
                    </Text>
                    <Text style={styles.valueSmall}>
                      {item.courier + ' || ' + item.service_name}
                    </Text>
                  </View>
                  <View style={[styles.invoiceWrapper, styles.textMargin]}>
                    <Text numberOfLines={1} style={styles.keySmall}>
                      Order
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.valueSmall}>
                      {currencyFormat(item.total_price)}
                    </Text>
                  </View>
                  <View style={[styles.invoiceWrapper, styles.textMarginFar]}>
                    <Text numberOfLines={1} style={styles.keySmall}>
                      Delivery
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.valueSmall}>
                      {currencyFormat(item.delivery_fee)}
                    </Text>
                  </View>
                  <View style={[styles.invoiceWrapper, styles.textMargin]}>
                    <Text
                      numberOfLines={1}
                      style={[styles.keySmall, styles.bold]}>
                      Total
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.valueSmall}>
                      {currencyFormat(item.total_payment)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : null}
      <View style={styles.btnWrapper}>
        {data.status ? (
          <TouchableOpacity rounded style={styles.btn} onPress={giveFeedBack}>
            <Text style={styles.btnTxt}>Leave Feedback</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity rounded style={styles.btn} onPress={commitPayment}>
            <Text style={styles.btnTxt}>Pay Transaction</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
  },
  parentScroll: {
    width: '100%',
  },
  invoiceWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  marginTop: {
    marginTop: 20,
  },
  cardWrapper: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%',
  },
  key: {
    textAlign: 'left',
    width: '35%',
    fontSize: 16,
    color: 'grey',
  },
  value: {
    textAlign: 'right',
    width: '65%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#102526',
  },
  summaryText: {
    fontWeight: 'bold',
    color: '#102526',
    marginBottom: 15,
  },
  marginBottomFar: {
    marginBottom: 100,
  },
  textMarginFar: {
    marginBottom: 15,
  },
  textMargin: {
    marginBottom: 2,
  },
  keySmall: {
    textAlign: 'left',
    width: '50%',
    color: 'grey',
  },
  valueSmall: {
    textAlign: 'right',
    width: '50%',
    fontWeight: 'bold',
    color: '#102526',
  },
  bold: {
    fontWeight: 'bold',
  },
  upperSummary: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: 'grey',
  },
  paid: {
    color: '#457373',
  },
  unpaid: {
    color: '#7C4935',
  },
  card: {
    elevation: 3,
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    zIndex: 10,
    marginBottom: 20,
  },
  itemDetailWrapper: {
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    borderRadius: 8,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imageWrapper: {
    width: '15%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDetail: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  detailNameWrapper: {
    width: '35%',
    paddingLeft: 15,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#102526',
  },
  itemColor: {
    color: 'grey',
  },
  detailQuantity: {
    width: '20%',
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceItem: {
    width: '30%',
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    padding: 10,
    borderRadius: 300,
    elevation: 1,
    borderColor: '#457373',
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    zIndex: 10,
  },
  btnTxt: {
    color: '#457373',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
