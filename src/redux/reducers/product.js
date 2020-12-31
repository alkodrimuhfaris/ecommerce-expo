const initialState = {
  dataNewItems: [],
  pageInfoNewItems: {},
  dataPopularItems: [],
  pageInfoPopularItems: {},
  detailItem: [],
  detailColorItem: [],
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEW_PRODUCTS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_NEW_PRODUCTS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_NEW_PRODUCTS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        dataNewItems: action.payload.data.data,
        pageInfoNewItems: action.payload.data.pageInfo,
      };
    }
    case 'GET_POPULAR_PRODUCTS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_POPULAR_PRODUCTS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_POPULAR_PRODUCTS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        dataPopularItems: action.payload.data.data,
        pageInfoPopularItems: action.payload.data.pageInfo,
      };
    }
    case 'GET_DETAIL_PRODUCT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DETAIL_PRODUCT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_DETAIL_PRODUCT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        detailItem: action.payload.data,
      };
    }
    case 'GET_DETAIL_COLOR_PRODUCT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GGET_DETAIL_COLOR_PRODUCT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'GET_DETAIL_COLOR_PRODUCT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        detailColorItem: action.payload.data.data,
      };
    }
    default: {
      return state;
    }
  }
};
