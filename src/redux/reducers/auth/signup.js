const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'SIGN_UP_PENDING': {
      return {
        success: false,
        error: false,
        pending: true,
        message: 'Signing you up',
      };
    }
    case 'SIGN_UP_REJECTED': {
      return {
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'SIGN_UP_FULFILLED': {
      return {
        success: true,
        error: false,
        pending: false,
        message: 'Sign-Up successfull!',
      };
    }
    case 'CLEAR_ALERT_SIGNUP': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
