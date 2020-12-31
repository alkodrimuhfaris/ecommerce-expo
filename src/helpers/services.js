import {default as axios} from 'axios';

const {EXPO_API_URL} = process.env;
export default (token = false) => {
  return axios.create({
    baseURL: EXPO_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};
