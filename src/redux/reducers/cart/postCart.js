const initialState = {
  error: false,
  pending: false,
  success: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'POST_NEW_CART_PENDING': {
      return {
        ...state,
        error: false,
        pending: true,
        success: false,
        message: 'Adding items to your carts...',
      };
    }
    case 'POST_NEW_CART_REJECTED': {
      return {
        ...state,
        error: true,
        pending: false,
        success: false,
        message: action.payload.response.data.message,
      };
    }
    case 'POST_NEW_CART_FULFILLED': {
      return {
        ...state,
        error: false,
        pending: false,
        success: true,
        message: 'Add new cart success',
      };
    }
    case 'CLEAR_CART_CHECKOUT': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
