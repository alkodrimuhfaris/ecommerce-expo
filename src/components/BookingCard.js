import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Card} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import currencyFormat from '../helpers/currencyFormat';
import ModalAlert from './ModalAlert';
import ModalLoading from './ModalLoading';

export default function BookingCard({
  item = {},
  delCart = () => {},
  setQuantity = () => {},
  quantity = [],
}) {
  const {item: data, index} = item;
  const {EXPO_API_URL} = process.env;
  const [count, setCount] = useState(
    Object.keys(data).length ? data.quantity : 0,
  );
  const [price, setPrice] = useState(
    Object.keys(data).length ? data.price * data.count : 0,
  );
  const [del, isDelOpen] = useState(false);

  useEffect(() => {
    const newQty = [...quantity];
    console.log('this quantity');
    console.log(newQty);
    newQty[index] = count;
    setQuantity(newQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, index]);

  useEffect(() => {
    // updateSet(index, data.detail_id, count, price);
    console.log('this from booking card');
    console.log(price);
  }, [count, price]);

  useEffect(() => {
    setPrice(count * data.price);
  }, [count, data]);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const openDel = () => {
    isDelOpen(!del);
  };

  const deleteCart = () => {
    delCart(data.id, data.name, data.color_name);
  };

  return (
    <View style={cardStyle.parentWrapper}>
      <Card style={cardStyle.parent}>
        <Image
          source={{
            uri: process.env.EXPO_API_URL + data.product_image_1,
          }}
          style={cardStyle.image}
        />

        {del ? (
          <TouchableOpacity onPress={deleteCart} style={cardStyle.delete}>
            <Text style={cardStyle.delTxt}>Delete from the list</Text>
          </TouchableOpacity>
        ) : null}
        <View style={cardStyle.productDetail}>
          <View style={cardStyle.spreadWrap}>
            <Text style={cardStyle.title}>{data.name}</Text>
            <TouchableOpacity onPress={openDel} style={cardStyle.ellipsis}>
              <FontAwesome name={'ellipsis-v'} color={'#5A6868'} size={16} />
            </TouchableOpacity>
          </View>

          <View style={cardStyle.detailCont}>
            <View style={cardStyle.detailWrap}>
              <Text style={cardStyle.key}>Color: </Text>
              <Text style={cardStyle.value}>{data.color_name}</Text>
            </View>
          </View>

          <View style={cardStyle.detailCont}>
            <View style={cardStyle.detailWrap}>
              <Text style={cardStyle.key}>Store: </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={cardStyle.valueStore}>
                {data.store_name}
              </Text>
            </View>
          </View>

          <View style={cardStyle.spreadWrap}>
            <View style={cardStyle.btnWrap}>
              <TouchableOpacity
                style={cardStyle.btn}
                disabled={count <= 1}
                onPress={decrease}>
                <Text style={cardStyle.btnTxt}>-</Text>
              </TouchableOpacity>
              <Text style={cardStyle.counter}>{count}</Text>
              <TouchableOpacity style={cardStyle.btn} onPress={increase}>
                <Text style={cardStyle.btnTxt}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={cardStyle.price}>{currencyFormat(price)}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  ellipsis: {
    position: 'absolute',
    right: -10,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    zIndex: 2,
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetail: {
    marginLeft: 10,
    flexDirection: 'column',
    width: '65%',
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
  },
  parentWrapper: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: '5%',
  },
  parent: {
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    height: 120,
  },
  delete: {
    position: 'absolute',
    top: 20,
    right: 40,
    padding: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  delTxt: {
    fontSize: 14,
    color: '#102526',
  },
  spreadWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 100,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 36,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  btnTxt: {
    fontSize: 16,
    color: '#5A6868',
  },
  counter: {
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
  },
  image: {
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    width: 105,
    height: 120,
  },
  detailCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
  },
  key: {
    fontSize: 12,
    color: '#5A6868',
  },
  value: {
    fontSize: 12,
    color: '#102526',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  valueStore: {
    flex: 1,
    fontSize: 12,
    color: '#102526',
    fontWeight: 'bold',
    marginLeft: 2,
  },
});
