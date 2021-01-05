/* eslint-disable react-hooks/exhaustive-deps */
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
import ModalLoading from '../components/ModalLoading';
import ModalAlert from '../components/ModalAlert';
import actions from '../redux/actions/index';
import {useNavigation} from '@react-navigation/native';

export default function DetailProduct({route}) {
  const navigation = useNavigation();
  const {cartAction} = actions;
  const {id} = route.params;
  const dispatch = useDispatch();

  const detailItem = useSelector((state) => state.detailProduct);
  const productsNew = useSelector((state) => state.product.newProducts);
  const token = useSelector((state) => state.auth.token);
  const postCart = useSelector((state) => state.postCart);

  const {dataItem, productDetails} = detailItem;
  const alsoLikeData = productsNew;
  const [colorSelected, setColorSelected] = React.useState(0);
  const [quantity, setQuantiy] = React.useState(1);
  const [photoArr, setPhotoArr] = React.useState([]);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [propsNotif, setPropsNotif] = React.useState({});

  React.useEffect(() => {
    if (dataItem) {
      const {
        product_image_1,
        product_image_2,
        product_image_3,
        product_image_4,
      } = dataItem;
      const arrOfPhoto = [
        product_image_1,
        product_image_2,
        product_image_3,
        product_image_4,
      ].filter((item) => item);
      setPhotoArr(arrOfPhoto);
    }
  }, [dataItem]);

  React.useEffect(() => {
    console.log(photoArr);
  }, [photoArr]);

  React.useEffect(() => {
    dispatch(productActions.getNewItems());
  }, []);

  React.useEffect(() => {
    console.log(id);
    dispatch(productActions.getDetailItem(id));
  }, [id]);

  const colorPress = (detail_id) => {
    console.log(detail_id);
    setColorSelected(detail_id);
  };

  const changeQty = (qty) => {
    console.log(quantity);
    setQuantiy(qty);
  };

  const addToCart = () => {
    if (!colorSelected) {
      setPropsNotif({
        content: 'Choose color first!',
        confirm: () => {
          setOpenNotif(false);
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    } else {
      if (token) {
        dispatch(cartAction.postCart(token, quantity, id, colorSelected));
      } else {
        setPropsNotif({
          content: 'Login first',
          confirm: () => {
            navigation.navigate('authStack', {screen: 'Login'});
          },
          confirmText: 'Login',
          discard: () => {
            setOpenNotif(false);
          },
          discardText: 'No',
        });
        setOpenNotif(true);
      }
    }
  };

  React.useEffect(() => {
    if (postCart.success) {
      setPropsNotif({
        content: 'Add to cart succss!',
        confirm: () => {
          dispatch(cartAction.clearCartCheckout());
          setOpenNotif(false);
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    } else if (postCart.error) {
      setPropsNotif({
        content: postCart.message,
        confirm: () => {
          dispatch(cartAction.clearCartCheckout());
          setOpenNotif(false);
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    }
  }, [postCart.pending]);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ModalAlert modalOpen={openNotif} {...propsNotif} />
      <ModalLoading modalOpen={detailItem.pending || postCart.pending} />
      <View style={styles.scrollParent}>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.imageWrapper}>
            <FlatList
              data={photoArr}
              showsHorizontalScrollIndicator={false}
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
          <Button onPress={addToCart} style={styles.btn}>
            <Text style={styles.btnTxt}>ADD TO CART</Text>
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
