import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function ProductImage({item}) {
  const {item: pic, index} = item;
  return (
    <TouchableOpacity style={imageStyles.parent}>
      <Image
        source={{
          uri: process.env.EXPO_API_URL + pic,
        }}
        style={imageStyles.image}
      />
    </TouchableOpacity>
  );
}

const imageStyles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  image: {
    height: '100%',
    width: 350,
  },
});
