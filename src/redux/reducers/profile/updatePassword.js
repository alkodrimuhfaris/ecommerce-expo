const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Sending your new password...',
      };
    }
    case 'CHANGE_PASSWORD_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'CHANGE_PASSWORD_FULFILLED': {
      return {
        success: true,
        error: false,
        pending: false,
        message: action.payload.data.message,
      };
    }
    case 'CLEAR_STATE_PASS': {
      return {
        ...state,
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
