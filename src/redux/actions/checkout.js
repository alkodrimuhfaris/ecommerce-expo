import qs from 'qs';
import services from '../../helpers/services';

export default {
  addCheckoutData: (payload = {}) => ({
    type: 'ADD_CHECKOUT',
    payload,
  }),
  removeCheckoutData: () => ({
    type: 'REMOVE_CHECKOUT_DATA',
  }),
  getDeliveryFee: (token, dataBooking = [], address_id) => ({
    type: 'GET_DELIVERY_FEE',
    payload: services(token).get(
      `/checkout/deliveryfee?${qs.stringify({dataBooking, address_id})}`,
    ),
  }),
  processPayment: (token, data = {}) => ({
    type: 'PROCESS_PAYMENT',
    payload: services(token).post('/checkout/commit', data),
  }),
  getCheckout: (token, data = {}) => ({
    type: 'GET_CHECKOUT',
    payload: services(token).post('/checkout/get', data),
  }),
};
