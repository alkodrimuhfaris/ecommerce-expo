import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function AddressCards({
  item,
  selected = 0,
  checkout = false,
  changeAddress = () => {},
}) {
  const navigation = useNavigation();
  const {item: detailAddress} = item;
  const {
    id,
    address_name,
    primary_address,
    city,
    city_type,
    address,
  } = detailAddress;

  const goToChange = () => {
    if (checkout) {
      navigation.navigate('AddressStack', {
        screen: 'SelectAddress',
        params: {selectCheckout: true},
      });
    } else {
      navigation.navigate('AddressStack', {
        screen: 'UpdateAddress',
        params: {id},
      });
    }
  };

  return (
    <View style={addressStyle.parent}>
      <View
        style={[addressStyle.card, selected ? addressStyle.cardSelect : null]}>
        <View style={addressStyle.nameWrap}>
          <Text style={!selected ? addressStyle.name : addressStyle.nameSelect}>
            {address_name}
          </Text>
          <TouchableOpacity onPress={goToChange}>
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
          {address + ', ' + city_type + ' ' + city}
        </Text>
        <View style={addressStyle.primaryWrapper}>
          {primary_address ? (
            <Text
              style={
                !selected ? addressStyle.primary : addressStyle.primarySelected
              }>
              {primary_address ? 'primary address' : null}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const addressStyle = StyleSheet.create({
  parent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    flex: 1,
    elevation: 3,
    borderRadius: 8,
    padding: 28,
    backgroundColor: 'white',
  },
  cardSelect: {
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
  primaryWrapper: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'flex-end',
  },
  primary: {
    color: '#9B8148',
    fontSize: 12,
  },
  primarySelected: {
    color: 'white',
    fontSize: 12,
  },
});
