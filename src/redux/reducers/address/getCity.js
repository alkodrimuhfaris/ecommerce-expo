const initialState = {
  pending: false,
  error: false,
  success: false,
  message: '',
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_CITY_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Getting city...',
      };
    }
    case 'GET_CITY_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_CITY_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Get city success',
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
