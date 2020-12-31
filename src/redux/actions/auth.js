import services from '../../helpers/services';
import qs from 'qs';

export default {
  login: ({email, password}) => ({
    type: 'AUTH_USER_LOGIN',
    payload: services().post('auth/login/customer' + qs(email, password)),
  }),
  logout: () => ({
    type: 'AUTH_USER_LOGOUT',
  }),
  setToken: (payload) => ({
    type: 'SET_TOKEN',
    payload,
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
