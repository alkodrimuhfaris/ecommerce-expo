import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Container, Button, Form, Input} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';

function ButtonSuggestion() {
  return (
    <Button rounded style={styles.btn}>
      <Text style={styles.btnTxt}>Work Shoes</Text>
    </Button>
  );
}

export default function Search({navigation}) {
  const [search, setSearch] = useState('');

  const goSearch = () => {
    navigation.navigate('AllProductStack', {
      screen: 'AllProduct',
      params: {
        title: 'Search for: ' + search,
        search,
      },
    });
  };

  return (
    <Container style={styles.container}>
      <Form>
        <View style={styles.inputWrapper}>
          <Input
            rounded
            style={styles.input}
            placeholder={'Search'}
            placeholderTextColor={'#DADADA'}
            value={search}
            onSubmitEditing={goSearch}
            onChangeText={(e) => setSearch(e)}
          />
          <FontAwesome
            style={styles.iconSearch}
            name="search"
            color={'#DADADA'}
            size={16}
          />
        </View>
      </Form>

      <Text style={styles.text}>Popular Search</Text>

      <View style={styles.btnArrWrap}>
        {[...Array(10)].map((_item, index) => (
          <ButtonSuggestion key={index} />
        ))}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '2%',
    paddingLeft: '2%',
  },
  inputWrapper: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  input: {
    borderColor: '#102526',
    borderWidth: 1,
    paddingLeft: 40,
    borderRadius: 30,
    width: '100%',
    height: 40,
  },
  iconSearch: {
    position: 'absolute',
    top: 12,
    left: 15,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
  },
  btn: {
    margin: 3,
    padding: 3,
    width: 'auto',
    borderColor: '#7C4935',
    borderWidth: 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#7C4935',
    fontSize: 11,
    textAlign: 'center',
  },
  btnArrWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
  },
});
