import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';
import Toggle from '../components/Toggle';

export default function ChangeProfile() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addressName, setAddressName] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [primaryAddress, setPrimaryAddress] = useState(false);
  const togglePrimary = () => {
    setPrimaryAddress((previousState) => !previousState);
  };

  const zipCheck = (e) => {
    e = e.replace(/[^0-9]/g, '');
    setZipCode(e);
  };

  useEffect(() => {
    console.log(name);
    console.log(address);
    console.log(addressName);
    console.log(city);
    console.log(province);
    console.log(zipCode);
    console.log(primaryAddress);
  }, [name, address, addressName, city, province, zipCode, primaryAddress]);

  return (
    <ScrollView>
      <Text style={styles.title}>Add Shipping Address</Text>

      <Form style={styles.container}>
        <View style={styles.secondary}>
          <Item floatingLabel>
            <Label style={styles.labelTxt}>Name</Label>
            <Input
              placeholder="Name"
              onChangeText={(e) => setName(e)}
              style={styles.input}
              value={name}
            />
          </Item>
        </View>

        <View style={styles.secondary}>
          <Item floatingLabel>
            <Label style={styles.labelTxt}>Address</Label>
            <Input
              placeholder="Address"
              onChangeText={(e) => setAddress(e)}
              style={styles.input}
              value={address}
            />
          </Item>
        </View>

        <View style={styles.secondary}>
          <Item floatingLabel>
            <Label style={styles.labelTxt}>Save Address As</Label>
            <Input
              placeholder="Save Address As"
              onChangeText={(e) => setAddressName(e)}
              style={styles.input}
              value={addressName}
            />
          </Item>
        </View>

        <View style={styles.secondary}>
          <Item floatingLabel>
            <Label style={styles.labelTxt}>Province/Region</Label>
            <Input
              placeholder="City"
              onChangeText={(e) => setCity(e)}
              style={styles.input}
              value={city}
            />
          </Item>
        </View>

        <View style={styles.secondary}>
          <Item floatingLabel>
            <Label style={styles.labelTxt}>City</Label>
            <Input
              placeholder="Province"
              onChangeText={(e) => setProvince(e)}
              style={styles.input}
              value={city}
            />
          </Item>
        </View>

        <View style={styles.secondary}>
          <Item floatingLabel>
            <Label style={styles.labelTxt}>Zip Code</Label>
            <Input
              placeholder="Zip Code"
              keyboardType="numeric"
              onChangeText={(e) => zipCheck(e)}
              style={styles.input}
              value={zipCode}
            />
          </Item>
        </View>

        <View style={styles.alignWrap}>
          <Text style={styles.toglerTxt}>Set Primary Address</Text>
          <View>
            <Toggle isEnabled={primaryAddress} toggleSwitch={togglePrimary} />
          </View>
        </View>

        <Button style={styles.btn}>
          <Text style={styles.btnTxt}>SAVE ADRESS</Text>
        </Button>
      </Form>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 30,
    marginBottom: 30,
  },
  secondary: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    elevation: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  radioWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  floatingSave: {
    position: 'absolute',
    top: 30,
    right: 30,
    color: '#457373',
    padding: 5,
    borderRadius: 30,
    justifyContent: 'center',
  },
  saveTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    color: '#102526',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },
  labelTxt: {
    color: '#102526',
  },
  radioLabel: {
    fontSize: 20,
    marginBottom: 10,
  },
  alignWrap: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#102526',
  },
  changePass: {
    fontSize: 14,
    color: '#457373',
  },
  toglerTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#102526',
  },
  btn: {
    marginTop: 20,
    width: 350,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#457373',
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
  },
});
