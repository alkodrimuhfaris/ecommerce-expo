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
    case 'UPDATE_ADDRESS_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Updating your address',
      };
    }
    case 'UPDATE_ADDRESS_success': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: action.payload.response.data.message,
      };
    }
    case 'UPDATE_ADDRESS_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        message: 'Success add update address',
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
  }
};
