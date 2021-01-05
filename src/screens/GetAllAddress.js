import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Container, Button, Input, Card} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import AddressCards from '../components/AddressCards';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../redux/actions/index';

export default function SelectAddress({params}) {
  const dispatch = useDispatch();
  const {addressAction} = actions;
  const token = useSelector((state) => state.auth.token);
  const getAddress = useSelector((state) => state.getAddress);
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(0);

  const selecting = (e) => {
    setSelect(e);
  };

  useEffect(() => {
    dispatch(addressAction.getAddress(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    console.log(select);
  }, [select]);

  const selectAddres = (id) => {
    console.log(id);
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

      <Text style={styles.title}>Address</Text>

      <FlatList
        data={getAddress.data}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              key={item.index}
              onPress={() => selecting(item.index)}
              style={styles.wrapper}>
              <AddressCards
                item={item}
                selected={select === item.index ? 1 : 0}
              />
            </TouchableOpacity>
          );
        }}
      />

      <Button rounded style={styles.btn}>
        <Text style={styles.btnTxt}>ADD NEW ADDRESS</Text>
      </Button>
    </View>
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
