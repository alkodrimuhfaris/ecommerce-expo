const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_ADDRESS_ID_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success get detail address',
        data: action.payload.data.result,
      };
    }
    case 'GET_ADDRESS_ID_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_ADDRESS_ID_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Getting detail address',
      };
    }
    case 'CLEAR_STATE_ADDRESS': {
      return {
        ...state,
        success: false,
        error: false,
        pending: false,
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
