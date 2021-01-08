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
    case 'POST_NEW_ADDRESS_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Add your new address',
      };
    }
    case 'POST_NEW_ADDRESS_success': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: action.payload.response.data.message,
      };
    }
    case 'POST_NEW_ADDRESS_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        message: 'Success add new address',
      };
    }
    case 'CLEAR_STATE_ADDRESS': {
      return {
        ...state,
        pending: false,
        error: false,
        success: false,
        message: '',
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
