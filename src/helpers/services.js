import {default as axios} from 'axios';

export default (token = false) => {
  return axios.create({
    baseURL: process.env.EXPO_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};
