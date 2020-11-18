const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ARTICLES_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Logging in ...',
      };
    }
    case 'GET_ALL_ARTICLES_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isError: false,
        data: action.payload.data.results,
        alertMsg: 'get data succeed',
      };
    }
    case 'GET_ALL_ARTICLES_REJECTED': {
      return {
        ...state,
        isLogin: false,
        isError: true,
        alertMsg: 'get data failed',
      };
    }
    default: {
      return state;
    }
  }
};