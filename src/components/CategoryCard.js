import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Card} from 'native-base';

const {EXPO_API_URL} = process.env;

export default function CategoryCard({item, selectCategory}) {
  const {item: categoryData} = item;
  const {id, name, categories_image} = categoryData;

  const selected = () => {
    selectCategory(id, name);
  };

  return (
    <TouchableOpacity style={cardStyle.cardWrapper} onPress={selected}>
      <Card style={cardStyle.parent}>
        <Text style={cardStyle.text}>{name}</Text>
        <Image
          source={{
            uri: EXPO_API_URL + categories_image,
          }}
          style={cardStyle.image}
        />
      </Card>
    </TouchableOpacity>
  );
}

const cardStyle = StyleSheet.create({
  parent: {
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  cardWrapper: {
    marginVertical: 5,
  },
  text: {
    marginLeft: 23,
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '50%',
    height: '100%',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
});
