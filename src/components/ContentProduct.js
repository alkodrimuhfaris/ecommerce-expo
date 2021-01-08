import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import currencyFormat from '../helpers/currencyFormat';
import StarRating from './StarRating';
import ColorButton from './ColorButton';
import Counter from './Counter';
import ProductCard from './ProductCard';

export default function ContentProduct({
  colorPress,
  changeQty,
  quantity,
  colorSelected,
  productDetails,
  dataItem,
  alsoLikeData,
}) {
  return (
    <ScrollView style={bodyStyles.parent}>
      <View style={bodyStyles.container}>
        <View style={bodyStyles.detailContainer}>
          <View style={bodyStyles.colorWrapper}>
            <Text style={bodyStyles.titleTxt}>Color</Text>
            <View style={bodyStyles.color}>
              <FlatList
                data={productDetails ? productDetails : []}
                horizontal={true}
                renderItem={(item) => {
                  return (
                    <TouchableOpacity
                      style={bodyStyles.colorIndividu}
                      onPress={() => colorPress(item.item.id)}>
                      <ColorButton item={item} selected={colorSelected} />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
          <View style={bodyStyles.counterWrapper}>
            <Text style={bodyStyles.titleTxt}>Quantity</Text>
            <View style={bodyStyles.counter}>
              <Counter values={quantity} countChange={changeQty} />
            </View>
          </View>
        </View>
        <View style={bodyStyles.titleWrap}>
          <View style={bodyStyles.title}>
            <Text
              style={bodyStyles.titleTxt}
              ellipsizeMode={'tail'}
              numberOfLines={2}>
              {dataItem.name}
            </Text>
            <Text
              style={bodyStyles.product}
              ellipsizeMode={'tail'}
              numberOfLines={2}>
              {dataItem.store_name}
            </Text>
          </View>
          <View style={bodyStyles.priceWrapper}>
            <Text style={bodyStyles.price}>
              {currencyFormat(dataItem.price)}
            </Text>
          </View>
        </View>
        <View style={bodyStyles.starWrap}>
          <StarRating
            percent={Math.round((dataItem.ratingAvg * 100) / 5, 2)}
            ratingCount={dataItem.ratingCount}
          />
        </View>
        <View style={bodyStyles.descriptionWrapper}>
          <Text style={bodyStyles.description}>{dataItem.description}</Text>
        </View>
      </View>

      <View style={bodyStyles.anotherContainer}>
        <View style={bodyStyles.anotherWrap}>
          <Text style={bodyStyles.anotherTitle}>You Can Also Like This</Text>
          <Text style={bodyStyles.subtitle}>({'12'}) products</Text>
        </View>
        <View style={bodyStyles.anotherProduct}>
          <FlatList
            horizontal={true}
            data={alsoLikeData}
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => {
              return (
                <View style={bodyStyles.cardWrap}>
                  <ProductCard item={item} />
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const bodyStyles = StyleSheet.create({
  parent: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  colorIndividu: {
    borderRadius: 50,
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    width: '100%',
    padding: '5%',
    borderBottomWidth: 0.2,
    borderBottomColor: '#457373',
  },
  detailContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
  },
  colorWrapper: {
    width: '60%',
  },
  counterWrapper: {
    width: '40%',
  },
  color: {
    paddingVertical: 5,
    width: '100%',
  },
  counter: {
    paddingVertical: 5,
  },
  titleWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    width: '60%',
  },
  titleTxt: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#102526',
  },
  product: {
    width: '100%',
    fontSize: 12,
    color: '#5A6868',
  },
  priceWrapper: {
    width: '40%',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 26,
    color: '#457373',
  },
  starWrap: {
    marginVertical: 5,
  },
  descriptionWrapper: {
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    color: '#102526',
  },
  anotherProduct: {
    width: '100%',
    height: 'auto',
  },
  cardWrap: {
    marginHorizontal: 10,
  },
  anotherContainer: {
    marginBottom: 50,
    flex: 1,
    padding: '5%',
  },
  anotherWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  anotherTitle: {
    width: '60%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#102526',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'right',
    color: '#5A6868',
    width: '40%',
  },
});
