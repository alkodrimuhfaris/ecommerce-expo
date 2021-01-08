import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Container, Button, Input, Card} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import AddressCards from '../components/AddressCards';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../redux/actions/index';
import {useNavigation} from '@react-navigation/native';
import ModalAlert from '../components/ModalAlert';
import ModalLoading from '../components/ModalLoading';

export default function SelectAddress({route}) {
  const {addressAction} = actions;
  const {selectCheckout} = route.params
    ? route.params
    : {selectCheckout: false};
  const token = useSelector((state) => state.auth.token);
  const getAddress = useSelector((state) => state.getAddress);
  const address_id = useSelector((state) => state.selectAddress.address_id);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [openNotif, setOpenNotif] = useState(false);
  const [propsNotif, setPropsNotif] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    dispatch(addressAction.getAddress(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const selecting = (data, addressName) => {
    setPropsNotif({
      content: `Select ${addressName} as shipment address?`,
      confirm: () => {
        dispatch(addressAction.selectAddress(data));
        setOpenNotif(false);
        navigation.goBack();
      },
      confirmText: 'Yes',
      discard: () => {
        setOpenNotif(false);
      },
      discardText: 'No',
    });
    setOpenNotif(true);
  };

  const changeAddress = (id) => {
    console.log(id);
  };

  function nextPage() {
    console.log('next');
  }

  const addNewAddress = () => {
    navigation.navigate('AddressStack', {screen: 'CreateAddress'});
  };

  const doRefresh = () => {
    setRefreshing(true);
    dispatch(addressAction.getAddress(token));
    setRefreshing(false);
  };

  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <ModalLoading modalOpen={getAddress.pending} />
        <ModalAlert modalOpen={openNotif} {...propsNotif} />
        {/* <View style={styles.inputWrapper}>
          <Input
            rounded
            style={styles.input}
            placeholder={'Search'}
            placeholderTextColor={'#DADADA'}
            value={search}
            onChangeText={(e) => setSearch(e)}
          />
          <FontAwesome
            style={styles.iconSearch}
            name="search"
            color={'#DADADA'}
            size={16}
          />
        </View> */}

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Address</Text>
        </View>

        <View style={styles.flatListWrapper}>
          {getAddress.data.length ? (
            <FlatList
              data={getAddress.data ? getAddress.data : []}
              refreshing={refreshing}
              onRefresh={doRefresh}
              onEndReached={nextPage}
              showsVerticalScrollIndicator={false}
              onEndReachedTreshold={0.5}
              renderItem={(item) => {
                const {item: itemData, index} = item;
                return (
                  <TouchableOpacity
                    onPress={() => selecting(itemData, itemData.address_name)}
                    style={[
                      styles.wrapper,
                      index === getAddress.data.length - 1
                        ? styles.wrapperEnd
                        : null,
                    ]}>
                    <AddressCards
                      item={item}
                      changeAddress={changeAddress}
                      selected={
                        address_id === 0
                          ? itemData.primary_address
                          : address_id === itemData.id
                          ? 1
                          : 0
                      }
                    />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View style={styles.noAddress}>
              <Text style={styles.noAddressTxt}>
                No address found, Add your address!
              </Text>
            </View>
          )}
        </View>
        <View style={styles.btnWrapper}>
          <Button block rounded style={styles.btn} onPress={addNewAddress}>
            <Text style={styles.btnTxt}>ADD NEW ADDRESS</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    flex: 1,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 30,
    height: 40,
    position: 'relative',
  },
  input: {
    borderColor: '#102526',
    paddingLeft: 40,
    borderRadius: 30,
    width: '100%',
    height: 40,
    elevation: 4,
  },
  iconSearch: {
    position: 'absolute',
    top: 12,
    left: 15,
  },
  titleWrapper: {
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: 30,
    marginBottom: 10,
  },
  flatListWrapper: {
    width: '100%',
    flex: 1,
    zIndex: 1,
  },
  title: {
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
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
    padding: 3,
    borderColor: '#457373',
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    // marginBottom: 30,
    zIndex: 10,
  },
  btnTxt: {
    color: '#457373',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addressArrWrap: {
    flexDirection: 'column',
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
  wrapperEnd: {
    marginBottom: 100,
  },
  selected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#7C4935',
  },
  noAddress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  noAddressTxt: {
    textAlign: 'center',
    color: '#7C4935',
    fontSize: 14,
  },
});
