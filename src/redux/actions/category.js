import qs from 'qs';
import services from '../../helpers/services';

export default {
  getCategories: (query = {}) => ({
    type: 'GET_CATEGORIES',
    payload: services().get(`/public/categories?${qs.stringify(query)}`),
  }),
  scrollCategories: (nextQuery) => ({
    type: 'SCROLL_CATEGORIES',
    payload: services().get(`/public/categories?${nextQuery}`),
  }),
  getCategoriesDetail: (id, query = {}) => ({
    type: 'GET_CATEGORY_DETAIL',
    payload: services().get(`/public/categories/${id}?${qs.stringify(query)}`),
  }),
  scrollCategoryDetail: (id, nextQuery) => ({
    type: 'SCROLL_CATEGORY_DETAIL',
    payload: services().get(`/public/categories/${id}?${nextQuery}`),
  }),
};
