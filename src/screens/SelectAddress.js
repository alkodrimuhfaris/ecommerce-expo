import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Container, Button, Input, Card} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import AddressCards from '../components/AddressCards';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../redux/actions/index';

const data = [
  {
    id: 1,
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
  {
    id: 2,
    user_id: 3,
    address_name: 'Home',
    primary_address: 0,
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

export default function SelectAddress() {
  const address = data;
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(0);

  useEffect(() => {
    console.log(search);
    console.log(address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const selecting = (e) => {
    setSelect(e);
  };

  useEffect(() => {
    console.log(select);
  }, [select]);

  const changeAddress = (id) => {
    console.log(id);
  };

  function nextPage() {
    console.log('next');
  }

  const addNewAddress = () => {
    console.log('add new');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
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
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Address</Text>
      </View>

      <FlatList
        data={address.length ? address : []}
        onEndReached={nextPage}
        onEndReachedTreshold={0.5}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              onPress={() => selecting(item.index)}
              style={styles.wrapper}>
              <AddressCards
                item={item}
                changeAddress={changeAddress}
                selected={select === item.index ? 1 : 0}
              />
            </TouchableOpacity>
          );
        }}
      />

      <Button block rounded style={styles.btn} onPress={addNewAddress}>
        <Text style={styles.btnTxt}>ADD NEW ADDRESS</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
    alignItems: 'center',
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
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
  },
  btn: {
    margin: 3,
    padding: 3,
    borderColor: '#457373',
    borderWidth: 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
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
  selected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#7C4935',
  },
});
