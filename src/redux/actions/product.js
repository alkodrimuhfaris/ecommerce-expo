import services from '../../helpers/services';
import qs from 'qs';

export default {
  getDetailItem: (itemId) => ({
    type: 'GET_DETAIL_PRODUCT',
    payload: services().get(`/public/products/${itemId}`),
  }),
  getNewItems: () => ({
    type: 'GET_NEW_PRODUCTS',
    payload: services().get('public/new'),
  }),
  getPopularItems: () => ({
    type: 'GET_POPULAR_PRODUCTS',
    payload: services().get('public/popular'),
  }),
  getAllItems: (data = {}) => ({
    type: 'GET_ALL_ITEMS',
    payload: services().get('public/products' + '?' + qs.stringify(data)),
  }),
  getCategoryItems: (id, data = {}) => ({
    type: 'GET_ITEMS_CATEGORY',
    payload: services().get(
      'public/categories' + id + '?' + qs.stringify(data),
    ),
  }),
  getDetailColorItem: (detailItemId) => ({
    type: 'GET_DETAIL_COLOR_PRODUCT',
    payload: services().get('public/products/detail/' + detailItemId),
  }),
  searchItem: (query) => ({
    type: 'SEARCH_ITEM',
    payload: services().get(`/public/products?${qs.stringify(query)}`),
  }),
  scrollSearchItem: (nextQuery = '') => ({
    type: 'SCROLL_SEARCH_ITEM',
    payload: services().get(`/public/products?${nextQuery}`),
  }),
};
