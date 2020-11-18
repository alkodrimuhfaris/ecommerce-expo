import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card} from 'native-base';
import currency from '../helpers/currencyFormat';
import StarRating from '../components/StarRating';

export default function CardItem({item, newProduct = false}) {
  const {item: data, index} = item;
  const {id, name, rating, ratingCount, product_image_1, store_name} = data;

  return (
    <Card style={cardStyle.parent}>
      <TouchableOpacity>
        <View style={cardStyle.relativeParent}>
          {newProduct ? (
            <View style={cardStyle.newSign}>
              <Text style={cardStyle.signTxt}>New</Text>
            </View>
          ) : null}
          <Image
            source={{
              uri: 'http://54.147.22.87:8080/' + product_image_1,
            }}
            style={cardStyle.image}
          />
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
              numberOfLines={2}
              style={cardStyle.itemName}>
              {name}
            </Text>
            <Text style={cardStyle.itemPrice}>{currency(150000)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const cardStyle = StyleSheet.create({
  parent: {
    width: 150,
    height: 300,
  },
  newSign: {
    padding: 5,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#102526',
    zIndex: 2,
    borderRadius: 15,
  },
  relativeParent: {
    position: 'relative',
  },
  signTxt: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 3,
  },
  image: {
    width: 150,
    height: 180,
    borderRadius: 8,
    zIndex: 1,
  },
  bellowImgWrap: {
    padding: 4,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  starWrap: {
    flexDirection: 'row',
  },
  storeName: {
    fontSize: 11,
    color: '#9B9B9B',
  },
  itemName: {
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#102526',
  },
});
