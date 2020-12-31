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
import {useSelector, useDispatch} from 'react-redux';
import productActions from '../redux/actions/product';

export default function DetailProduct({route}) {
  const {id} = route.params;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(productActions.getNewItems());
  }, [dispatch]);

  React.useEffect(() => {
    console.log(id);
    dispatch(productActions.getDetailItem(id));
  }, [dispatch, id]);

  const detailItem = useSelector((state) => state.product.detailItem);
  const productsNew = useSelector((state) => state.product.dataNewItems);

  const {dataItem, productDetails} = detailItem;
  const alsoLikeData = productsNew;
  const [colorSelected, setColorSelected] = React.useState(0);
  const [quantity, setQuantiy] = React.useState(0);
  let photoArr = [];
  if (dataItem) {
    const {
      product_image_1,
      product_image_2,
      product_image_3,
      product_image_4,
    } = dataItem;
    photoArr = [
      product_image_1,
      product_image_2,
      product_image_3,
      product_image_4,
    ].filter((item) => item);
  }

  const colorPress = (detail_id) => {
    console.log(detail_id);
    setColorSelected(detail_id);
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
            productDetails={productDetails ? productDetails : {}}
            dataItem={dataItem ? dataItem : {}}
            alsoLikeData={alsoLikeData.length ? alsoLikeData : []}
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
