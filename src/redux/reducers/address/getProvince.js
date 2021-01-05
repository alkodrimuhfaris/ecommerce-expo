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
    case 'GET_PROVINCE_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Getting all of the province',
      };
    }
    case 'GET_PROVINCE_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_PROVINCE_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Get all of the province success',
        data: action.payload.data.results,
      };
    }
  }
};
