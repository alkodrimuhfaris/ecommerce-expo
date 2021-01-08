const initialState = {
  pending: false,
  error: false,
  success: false,
  message: '',
  userData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Getting profile...',
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: action.payload.response.message,
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        message: 'Get profile success',
        userData: action.payload.data.results,
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
