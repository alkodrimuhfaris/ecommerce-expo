import {combineReducers} from 'redux';

// auth
import auth from './auth/auth';
import signup from './auth/signup';

// product
import product from './product/product';
import detailProduct from './product/detailProduct';

// cart
import cartToCheckout from './cart/cartToCheckout';
import deleteCart from './cart/deleteCart';
import getCart from './cart/getCart';
import postCart from './cart/postCart';

// profile
import getProfile from './profile/getProfile';
import updateProfile from './profile/updateProfile';
import deleteAvatar from './profile/deleteAvatar';

// checkout
import checkoutData from './checkout/checkoutData';
import deliveryFees from './checkout/deliveryFees';
import getCheckout from './checkout/getCheckout';
import processPayment from './checkout/processPayment';

// address
import getAddress from './address/getAddress';
import getCity from './address/getCity';
import getProvince from './address/getProvince';
import postAddress from './address/postAddress';
import updateAddress from './address/updateAddress';

export default combineReducers({
  // auth
  auth,
  signup,

  // product
  product,
  detailProduct,

  // cart
  cartToCheckout,
  deleteCart,
  getCart,
  postCart,

  // profile
  getProfile,
  updateProfile,
  deleteAvatar,

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
});
