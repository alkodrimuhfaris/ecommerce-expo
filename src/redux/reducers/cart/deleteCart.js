const initialState = {
  pending: false,
  error: false,
  success: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'DELETE_BULK_CART_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Deleting carts...',
      };
    }
    case 'DELETE_BULK_CART_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: action.payload.response.data.message,
      };
    }
    case 'DELETE_BULK_CART_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: action.payload.data.message,
      };
    }
    case 'RESET_STATE_DELETE': {
      return {
        ...state,
        ...initialState,
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
