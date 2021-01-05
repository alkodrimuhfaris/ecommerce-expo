import services from '../../helpers/services';

export default {
  signup: (data = {}) => ({
    type: 'SIGN_UP',
    payload: services().post('/auth/signup/customer', data),
  }),
  clearAlert: () => ({
    type: 'CLEAR_ALERT_SIGNUP',
  }),
};
