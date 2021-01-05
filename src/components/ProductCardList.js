import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import currency from '../helpers/currencyFormat';
import StarRating from '../components/StarRating';
import {useNavigation} from '@react-navigation/native';

export default function CardItem({item, newProduct = false}) {
  const {item: data, index} = item;
  const {id, name, rating, ratingCount, product_image_1, store_name} = data;
  const navigation = useNavigation();

  const goToProduct = () => {
    navigation.navigate('ProductStack', {screen: 'Product', params: {id}});
    console.log(id);
  };

  return (
    <View style={cardStyle.parent}>
      <TouchableOpacity onPress={goToProduct} style={cardStyle.parentWrapper}>
        <View style={cardStyle.relativeParent}>
          {newProduct ? (
            <View style={cardStyle.newSign}>
              <Text style={cardStyle.signTxt}>New</Text>
            </View>
          ) : null}
          <Image
            source={{
              uri: process.env.EXPO_API_URL + product_image_1,
            }}
            style={cardStyle.image}
          />
        </View>
        <View style={cardStyle.componentWrapper}>
          <View style={cardStyle.bellowImgWrap}>
            <View style={cardStyle.starWrap}>
              <StarRating
                percent={(rating * 100) / 5}
                ratingCount={ratingCount}
              />
            </View>
            <Text style={cardStyle.storeName}>{store_name}</Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={cardStyle.itemName}>
              {name}
            </Text>
            <Text style={cardStyle.itemPrice}>{currency(150000)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  parent: {
    width: '100%',
    height: 100,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  parentWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  newSign: {
    padding: 5,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#102526',
    zIndex: 3,
    borderRadius: 15,
  },
  relativeParent: {
    width: '30%',
    height: 100,
    position: 'relative',
  },
  signTxt: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    zIndex: 1,
  },
  componentWrapper: {
    width: '70%',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  bellowImgWrap: {
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  starWrap: {
    flexDirection: 'row',
  },
  storeName: {
    fontSize: 11,
    color: '#9B9B9B',
  },
  itemName: {
    width: '100%',
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#102526',
  },
});
