const initialState = {
  error: false,
  pending: false,
  success: false,
  message: '',
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_CART_PENDING': {
      return {
        ...state,
        error: false,
        pending: true,
        success: false,
        message: 'Getting your carts...',
      };
    }
    case 'GET_CART_REJECTED': {
      return {
        ...state,
        error: true,
        pending: false,
        success: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_CART_FULFILLED': {
      return {
        ...state,
        error: false,
        pending: false,
        success: true,
        message: 'Get cart success',
        data: action.payload.data.results,
      };
    }
    case 'AUTH_USER_LOGOUT': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
