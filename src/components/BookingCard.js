import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Card} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import currencyFormat from '../helpers/currencyFormat';

export default function BookingCard({item = {}, updateSet}) {
  const {item: data, index} = item;
  const [count, setCount] = useState(
    Object.keys(data).length ? data.quantity : 0,
  );
  const [price, setPrice] = useState(
    Object.keys(data).length ? data.price * data.count : 0,
  );
  const [del, isDelOpen] = useState(false);

  useEffect(() => {
    updateSet(index, data.detail_id, count, price);
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
    console.log(data.detail_id);
  };

  return (
    <View style={cardStyle.parentWrapper}>
      <Card style={cardStyle.parent}>
        <Image
          source={{
            uri: data.product_image,
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
            <Text style={cardStyle.title}>{'New'}</Text>
            <TouchableOpacity onPress={openDel} style={cardStyle.ellipsis}>
              <FontAwesome name={'ellipsis-v'} color={'#5A6868'} size={16} />
            </TouchableOpacity>
          </View>

          <View style={cardStyle.detailCont}>
            <View style={cardStyle.detailWrap}>
              <Text style={cardStyle.key}>Color: </Text>
              <Text style={cardStyle.value}>{data.color_name}</Text>
            </View>
            {data.size ? (
              <View style={cardStyle.detailWrap}>
                <Text style={cardStyle.key}>Size: </Text>
                <Text style={cardStyle.value}>{data.size}</Text>
              </View>
            ) : null}
          </View>

          <View style={cardStyle.spreadWrap}>
            <View style={cardStyle.btnWrap}>
              <TouchableOpacity
                style={cardStyle.btn}
                disabled={!count}
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
    height: 105,
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
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 105,
    height: 105,
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
});
