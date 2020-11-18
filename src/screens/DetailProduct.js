import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button} from 'native-base';
import ProductImage from '../components/ProductImage';
import ContentProduct from '../components/ContentProduct';

const data = {
  dataItem: {
    id: 1,
    seller_id: 2,
    name: "Illi London Woman's Maxi Dress",
    description:
      'Fit Type: Regular Fabric: 95% Polyester, 5% Spandex Style: A-Line Midi Maxi Dress Fit Type: Regular Sleeve Type: Half Sleeve Dress Length: Calf Length',
    weight: 500,
    category_id: 11,
    condition_id: 1,
    created_at: '2020-10-29T10:22:22.000Z',
    updated_at: '2020-10-29T10:45:59.000Z',
    item_id: 1,
    product_image_1: 'Uploads/2-product_image-1603966940378.jpg',
    product_image_2: 'Uploads/2-product_image-1603966940437.jpg',
    product_image_3: 'Uploads/2-product_image-1603966940440.jpg',
    product_image_4: 'Uploads/2-product_image-1603966940447.jpg',
    user_id: 2,
    store_name: 'Arsenal Clothes',
    price: 150000,
    item_condition: 'New',
    rating: [
      {
        ratingAvg: 0,
        ratingBar: [0, 0, 0, 0, 0],
        starCount: [0, 0, 0, 0, 0],
        ratingCount: 0,
      },
    ],
  },
  productDetails: [
    {
      id: 1,
      item_id: 1,
      color_name: 'black',
      hex: '#000000',
      stock: 48,
      price: 150000,
      created_at: '2020-10-29T10:22:23.000Z',
      updated_at: '2020-11-01T16:57:31.000Z',
    },
    {
      id: 2,
      item_id: 1,
      color_name: 'pista',
      hex: '#9cc1c7',
      stock: 46,
      price: 150000,
      created_at: '2020-10-29T10:22:23.000Z',
      updated_at: '2020-11-01T16:57:31.000Z',
    },
    {
      id: 3,
      item_id: 1,
      color_name: 'pink',
      hex: '#f5b6ad',
      stock: 48,
      price: 150000,
      created_at: '2020-10-29T10:22:23.000Z',
      updated_at: '2020-11-01T16:57:32.000Z',
    },
    {
      id: 4,
      item_id: 1,
      color_name: 'blue',
      hex: '#1c1c50',
      stock: 46,
      price: 150000,
      created_at: '2020-10-29T10:22:23.000Z',
      updated_at: '2020-11-01T16:57:32.000Z',
    },
  ],
};

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

export default function App() {
  const {dataItem, productDetails} = data;
  const alsoLikeData = otherProducts;
  const [colorSelected, setColorSelected] = React.useState(0);
  const [quantity, setQuantiy] = React.useState(0);
  const {
    product_image_1,
    product_image_2,
    product_image_3,
    product_image_4,
  } = dataItem;
  const photoArr = [
    product_image_1,
    product_image_2,
    product_image_3,
    product_image_4,
  ].filter((item) => item);

  const colorPress = (id) => {
    console.log(id);
    setColorSelected(id);
  };

  const changeQty = (qty) => {
    console.log(quantity);
    setQuantiy(qty);
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.scrollParent}>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.imageWrapper}>
            <FlatList
              data={photoArr.length ? photoArr : []}
              horizontal={true}
              renderItem={(item) => {
                return <ProductImage item={item} />;
              }}
            />
          </View>

          <ContentProduct
            colorPress={colorPress}
            changeQty={changeQty}
            quantity={quantity}
            colorSelected={colorSelected}
            productDetails={productDetails}
            dataItem={dataItem}
            alsoLikeData={alsoLikeData}
          />
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={styles.parentBtn}>
          <Button style={styles.btn}>
            <Text style={styles.btnTxt}>CHECK OUT</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    position: 'relative',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  imageWrapper: {
    height: 400,
  },
  scrollParent: {
    flex: 1,
    zIndex: 1,
    width: '100%',
  },
  scrollContent: {
    width: '100%',
  },
  footer: {
    elevation: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    zIndex: 2,
  },
  parentBtn: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 100,
    padding: 5,
    width: 350,
    justifyContent: 'center',
    backgroundColor: '#457373',
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
