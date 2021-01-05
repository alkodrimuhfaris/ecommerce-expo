const initialState = {
  error: false,
  pending: false,
  success: false,
  message: '',
  dataItem: {},
  productDetails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_DETAIL_PRODUCT_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Getting detail product....',
      };
    }
    case 'GET_DETAIL_PRODUCT_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_DETAIL_PRODUCT_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        message: 'Success get detail product',
        dataItem: action.payload.data.dataItem,
        productDetails: action.payload.data.productDetails,
      };
    }
  }
};
