const initialState = {
  dataNewItems: [],
  pageInfoNewItems: {},
  dataPopularItems: [],
  pageInfoPopularItems: {},
  detailItem: [],
  detailColorItem: [],

  newPending: false,
  newError: false,
  newSuccess: false,
  newMessage: '',
  newProducts: [],
  newPageInfo: {},

  popularPending: false,
  popularError: false,
  popularSuccess: false,
  popularMessage: '',
  popularData: [],
  popularPageInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEW_PRODUCTS_PENDING': {
      return {
        ...state,
        newPending: true,
        newError: false,
        newSuccess: false,
        newMessage: 'Getting new products',
      };
    }
    case 'GET_NEW_PRODUCTS_REJECTED': {
      return {
        ...state,
        newPending: false,
        newError: true,
        newSuccess: false,
        newMessage: action.payload.response.data.message,
      };
    }
    case 'GET_NEW_PRODUCTS_FULFILLED': {
      return {
        ...state,
        newPending: false,
        newError: false,
        newSuccess: true,
        newMessage: 'Get new products is success!',
        newProducts: action.payload.data.results,
        newPageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_POPULAR_PRODUCTS_PENDING': {
      return {
        ...state,
        popularPending: true,
        popularError: false,
        popularSuccess: false,
        newMessage: 'Getting new products',
      };
    }
    case 'GET_POPULAR_PRODUCTS_REJECTED': {
      return {
        ...state,
        popularPending: false,
        popularError: false,
        popularSuccess: false,
        popularMessage: action.payload.data.results,
      };
    }
    case 'GET_POPULAR_PRODUCTS_FULFILLED': {
      return {
        ...state,
        popularPending: false,
        popularError: false,
        popularSuccess: false,
        popularMessage: 'Success get popular product',
        popularProducts: action.payload.data.results,
        popularPageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_DETAIL_COLOR_PRODUCT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DETAIL_COLOR_PRODUCT_REJECTED': {
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
        dataItem: action.payload.data.dataItem,
        detailColorItem: action.payload.data.productDetails,
      };
    }
    default: {
      return state;
    }
  }
};
