const initialState = {
  pending: false,
  error: false,
  success: false,
  message: '',
  data: [],
  pageInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_ADDRESS_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Getting your address',
      };
    }
    case 'GET_ADDRESS_success': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_ADDRESS_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        message: 'Success get address',
        data: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
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
