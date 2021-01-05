import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function AddressCards({
  item,
  selected = 0,
  changeAddress = () => {},
}) {
  const {item: detailAddress} = item;
  const {
    id,
    address_name,
    primary_address,
    city,
    city_type,
    address,
  } = detailAddress;
  console.log(selected);

  const goToChange = () => {
    changeAddress(id);
  };

  return (
    <View style={!selected ? addressStyle.card : addressStyle.cardSelect}>
      <View style={addressStyle.nameWrap}>
        <Text style={!selected ? addressStyle.name : addressStyle.nameSelect}>
          {address_name}
        </Text>
        <TouchableOpacity onPress={goToChange}>
          <Text
            style={!selected ? addressStyle.change : addressStyle.changeSelect}>
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
  );
}

const addressStyle = StyleSheet.create({
  card: {
    width: '100%',
    flex: 1,
    elevation: 3,
    borderRadius: 8,
    padding: 28,
  },
  cardSelect: {
    width: '100%',
    flex: 1,
    elevation: 3,
    borderRadius: 8,
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
