import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Container, Button, Input, Card} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';

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
]

  function AddressCards({selected = 0}) {
    console.log(selected);
    return (
      <Card
        rounded
        style={!selected ? addressStyle.card : addressStyle.cardSelect}>
        <View style={addressStyle.nameWrap}>
          <Text style={!selected ? addressStyle.name : addressStyle.nameSelect}>
            Jone Doe
          </Text>
          <TouchableOpacity>
            <Text
              style={
                !selected ? addressStyle.change : addressStyle.changeSelect
              }>
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={!selected ? addressStyle.address : addressStyle.addressSelect}
          numberOfLines={2}>
          {'3 Newbridge Court Chino Hills, CA 91709, United States'}
        </Text>
      </Card>
    );
  };

const addressStyle = StyleSheet.create({
  card: {
    width: 350,
    height: 120,
    padding: 28,
  },
  cardSelect: {
    width: 350,
    height: 120,
    padding: 28,
    backgroundColor: '#457373',
  },
  container: {
    padding: '2%',
  },
  nameWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    color: '#102526',
    fontWeight: 'bold',
  },
  nameSelect: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  change: {
    fontSize: 14,
    color: '#457373',
    fontWeight: 'bold',
  },
  changeSelect: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#102526',
    marginTop: 10,
  },
  addressSelect: {
    fontSize: 14,
    color: '#dddddd',
    marginTop: 10,
  },
});

export default function SelectAddress() {
  const address = data;
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(0);

  const selecting = (e) => {
    setSelect(e);
  };

  useEffect(() => {
    console.log(select);
  }, [select]);

  const selectAddres = (id) => {
    console.log(id);
  };

  return (
    <Container style={styles.container}>
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

      <Text style={styles.title}>Address</Text>

      <ScrollView>
        <View style={styles.addressArrWrap}>
          {[...Array(10)].map((_item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selecting(index)}
              style={styles.wrapper}>
              <AddressCards selected={select === index ? 1 : 0} />
            </TouchableOpacity>
          ))}
        </View>

        <Button rounded style={styles.btn}>
          <Text style={styles.btnTxt}>ADD NEW ADDRESS</Text>
        </Button>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '2%',
    paddingLeft: '2%',
  },
  inputWrapper: {
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
  title: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
  },
  btn: {
    margin: 3,
    padding: 3,
    flex: 1,
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
