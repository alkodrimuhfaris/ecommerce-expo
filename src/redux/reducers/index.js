import {combineReducers} from 'redux';

// auth
import auth from './auth/auth';
import signup from './auth/signup';

// product
import product from './product/product';
import detailProduct from './product/detailProduct';
import searchProduct from './product/searchProduct';

// cart
import cartToCheckout from './cart/cartToCheckout';
import deleteCart from './cart/deleteCart';
import getCart from './cart/getCart';
import postCart from './cart/postCart';

// profile
import getProfile from './profile/getProfile';
import updateProfile from './profile/updateProfile';
import deleteAvatar from './profile/deleteAvatar';
import updatePassword from './profile/updatePassword';

// checkout
import checkoutData from './checkout/checkoutData';
import deliveryFees from './checkout/deliveryFees';
import getCheckout from './checkout/getCheckout';
import processPayment from './checkout/processPayment';
import setDeliveryServices from './checkout/setDelIveryServices';

// address
import getAddress from './address/getAddress';
import getCity from './address/getCity';
import getProvince from './address/getProvince';
import postAddress from './address/postAddress';
import updateAddress from './address/updateAddress';
import selectAddress from './address/selectAddress';
import getDetailAddress from './address/getDetailAddress';

// transaction
import allTransaction from './transaction/allTransaction';
import payTransaction from './transaction/payTransaction';
import detailTransaction from './transaction/detailTransaction';
import topUp from './transaction/topUp';

// category
import getCategory from './category/getCategory';
import getDetailCategory from './category/getDetailCategories';

export default combineReducers({
  // auth
  auth,
  signup,

  // product
  product,
  detailProduct,
  searchProduct,

  // cart
  cartToCheckout,
  deleteCart,
  getCart,
  postCart,

  // profile
  getProfile,
  updateProfile,
  deleteAvatar,
  updatePassword,

  // checkout
  checkoutData,
  deliveryFees,
  getCheckout,
  processPayment,

  // address
  getAddress,
  getCity,
  getProvince,
  postAddress,
  updateAddress,
  selectAddress,
  getDetailAddress,
  setDeliveryServices,

  //transaction
  allTransaction,
  payTransaction,
  detailTransaction,
  topUp,

  // category
  getCategory,
  getDetailCategory,
});
