import services from '../../helpers/services';
import qs from 'qs';

export default {
  getProfile: (token) => ({
    type: 'GET_PROFILE',
    payload: services(token).get('/users'),
  }),
  updateProfile: (token, data) => ({
    type: 'UPDATE_PROFILE',
    payload: services(token).patch('/users', data),
  }),
  deleteAvatar: (token) => ({
    type: 'DELETE_AVATAR',
    payload: services(token).delete('/users/avatar'),
  }),
  clearStateAvatar: () => ({
    type: 'CLEAR_ALERT_DELETE_AVATAR',
  }),
  clearStateUpdate: () => ({
    type: 'CLEAR_STATE_UPDATE',
  }),
  changePassword: (token, data) => ({
    type: 'CHANGE_PASSWORD',
    payload: services(token).post('/users/password', qs.stringify(data)),
  }),
  clearStatePassword: () => ({
    type: 'CLEAR_STATE_PASS',
  }),
};
