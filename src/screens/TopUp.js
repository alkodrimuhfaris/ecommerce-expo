/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input, Item, Label} from 'native-base';
import ModalAlert from '../components/ModalAlert';
import ModalLoading from '../components/ModalLoading';
import actions from '../redux/actions';
import currencyFormat from '../helpers/currencyFormat';
import NumberFormat from 'react-number-format';

export default function TopUp() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const getProfile = useSelector((state) => state.getProfile);
  const userData = useSelector((state) => state.getProfile.userData);
  const topUp = useSelector((state) => state.topUp);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [propsAlert, setPropsAlert] = React.useState({});
  const [nominal, setNominal] = React.useState(0);

  React.useEffect(() => {
    if (topUp.success || topUp.error) {
      setPropsAlert({
        content: topUp.message,
        confirm: () => {
          dispatch(actions.transactionAction.clearNotifTopUp());
          dispatch(actions.profileAction.getProfile(token));
          setOpenAlert(false);
        },
        useOneBtn: true,
      });
      setOpenAlert(true);
    }
  }, [topUp.pending]);

  const commitTopUp = () => {
    setPropsAlert({
      content: `Top up for ${currencyFormat(nominal)}?`,
      confirm: () => {
        dispatch(actions.transactionAction.topUp(token, nominal));
        setOpenAlert(false);
      },
      confirmText: 'Proceed',
      discard: () => {
        setOpenAlert(false);
      },
      discardText: 'Discard',
    });
    setOpenAlert(true);
  };

  return (
    <View style={styles.parent}>
      <ModalLoading modalOpen={getProfile.pending || topUp.pending} />
      <ModalAlert modalOpen={openAlert} {...propsAlert} />
      {!getProfile.pending ? (
        <>
          <View style={[styles.cardWrapper, styles.marginTop]}>
            <View style={styles.invoiceWrapper}>
              <Text numberOfLines={1} style={styles.key}>
                Your Balance
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.value}>
                {currencyFormat(userData.balance)}
              </Text>
            </View>
          </View>
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <Text style={styles.summaryText}>Input nominal top up</Text>
              <View style={[styles.invoiceWrapper, styles.textMargin]}>
                <View style={styles.secondary}>
                  <Item floatingLabel style={styles.floatingLbl}>
                    <Label style={styles.labelTxt}>Rp</Label>
                    <Input
                      placeholder="Nominal top up"
                      onChangeText={(e) => setNominal(Number(e))}
                      style={styles.input}
                      keyboardType="numeric"
                      value={nominal}
                    />
                  </Item>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : null}
      <View style={styles.btnWrapper}>
        <TouchableOpacity rounded style={styles.btn} onPress={commitTopUp}>
          <Text style={styles.btnTxt}>Top Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    height: '100%',
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
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
  card: {
    elevation: 3,
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    fontWeight: 'bold',
    color: '#102526',
    marginBottom: 15,
  },
  invoiceWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textMargin: {
    marginBottom: 2,
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
  secondary: {
    marginTop: 10,
    marginBottom: 20,
    elevation: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: 14,
    color: '#457373',
  },
  floatingLbl: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#457373',
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
});
