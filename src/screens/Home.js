import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/HeaderHome';
import ProductCard from '../components/ProductCard';

const otherProducts = [
  {
    id: 1,
    name: "Illi London Woman's Maxi Dress",
    description:
      'Fit Type: Regular Fabric: 95% Polyester, 5% Spandex Style: A-Line Midi Maxi Dress Fit Type: Regular Sleeve Type: Half Sleeve Dress Length: Calf Length',
    stock: 188,
    price: 150000,
    created: '2020-10-29T10:22:22.000Z',
    rating: null,
    ratingCount: null,
    product_image_1: 'Uploads/2-product_image-1603966940378.jpg',
    product_image_2: 'Uploads/2-product_image-1603966940437.jpg',
    product_image_3: 'Uploads/2-product_image-1603966940440.jpg',
    product_image_4: 'Uploads/2-product_image-1603966940447.jpg',
    store_name: 'Arsenal Clothes',
  },
  {
    id: 2,
    name: "Illi London Woman's Maxi Dress",
    description:
      'Fit Type: Regular Fabric: 95% Polyester, 5% Spandex Style: A-Line Midi Maxi Dress Fit Type: Regular Sleeve Type: Half Sleeve Dress Length: Calf Length',
    stock: 188,
    price: 150000,
    created: '2020-10-29T10:22:22.000Z',
    rating: null,
    ratingCount: null,
    product_image_1: 'Uploads/2-product_image-1603966940378.jpg',
    product_image_2: 'Uploads/2-product_image-1603966940437.jpg',
    product_image_3: 'Uploads/2-product_image-1603966940440.jpg',
    product_image_4: 'Uploads/2-product_image-1603966940447.jpg',
    store_name: 'Arsenal Clothes',
  },
  {
    id: 3,
    name: "Illi London Woman's Maxi Dress",
    description:
      'Fit Type: Regular Fabric: 95% Polyester, 5% Spandex Style: A-Line Midi Maxi Dress Fit Type: Regular Sleeve Type: Half Sleeve Dress Length: Calf Length',
    stock: 188,
    price: 150000,
    created: '2020-10-29T10:22:22.000Z',
    rating: null,
    ratingCount: null,
    product_image_1: 'Uploads/2-product_image-1603966940378.jpg',
    product_image_2: 'Uploads/2-product_image-1603966940437.jpg',
    product_image_3: 'Uploads/2-product_image-1603966940440.jpg',
    product_image_4: 'Uploads/2-product_image-1603966940447.jpg',
    store_name: 'Arsenal Clothes',
  },
  {
    id: 4,
    name: "Illi London Woman's Maxi Dress",
    description:
      'Fit Type: Regular Fabric: 95% Polyester, 5% Spandex Style: A-Line Midi Maxi Dress Fit Type: Regular Sleeve Type: Half Sleeve Dress Length: Calf Length',
    stock: 188,
    price: 150000,
    created: '2020-10-29T10:22:22.000Z',
    rating: null,
    ratingCount: null,
    product_image_1: 'Uploads/2-product_image-1603966940378.jpg',
    product_image_2: 'Uploads/2-product_image-1603966940437.jpg',
    product_image_3: 'Uploads/2-product_image-1603966940440.jpg',
    product_image_4: 'Uploads/2-product_image-1603966940447.jpg',
    store_name: 'Arsenal Clothes',
  },
  {
    id: 5,
    name: "Illi London Woman's Maxi Dress",
    description:
      'Fit Type: Regular Fabric: 95% Polyester, 5% Spandex Style: A-Line Midi Maxi Dress Fit Type: Regular Sleeve Type: Half Sleeve Dress Length: Calf Length',
    stock: 188,
    price: 150000,
    created: '2020-10-29T10:22:22.000Z',
    rating: null,
    ratingCount: null,
    product_image_1: 'Uploads/2-product_image-1603966940378.jpg',
    product_image_2: 'Uploads/2-product_image-1603966940437.jpg',
    product_image_3: 'Uploads/2-product_image-1603966940440.jpg',
    product_image_4: 'Uploads/2-product_image-1603966940447.jpg',
    store_name: 'Arsenal Clothes',
  },
];

export default function Home() {
  const newProduct = otherProducts;
  const popularProduct = otherProducts;

  return (
    <SafeAreaView>
      <ScrollView vertical>
        <Header />

        <View style={styles.heading}>
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>New</Text>
            <Text style={styles.subtitle}>You'll never seen it before</Text>
          </View>
          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          data={newProduct}
          renderItem={(item) => {
            return (
              <View style={styles.cardWrap}>
                <ProductCard item={item} newProduct={true} />
              </View>
            );
          }}
        />

        <View style={styles.heading}>
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>Popular</Text>
            <Text style={styles.subtitle}>You'll never seen it before</Text>
          </View>
          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          data={popularProduct}
          renderItem={(item) => {
            return (
              <View style={styles.cardWrap}>
                <ProductCard item={item} />
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rightMargin: {
    marginRight: 4,
  },
  noRightMargin: {
    marginRight: 4,
    marginLeft: 4,
  },
  cardWrap: {
    marginHorizontal: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  wrapTitle: {
    flexDirection: 'column',
  },
  title: {
    color: '#102526',
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#9B9B9B',
    fontSize: 11,
  },
  viewAll: {
    color: '#102526',
  },
});
