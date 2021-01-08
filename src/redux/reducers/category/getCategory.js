const initialState = {
  data: [],
  pageInfo: {},
  pending: false,
  error: false,
  success: false,
  message: '',

  scrollPending: false,
  scrollError: false,
  scrollSuccess: false,
  scrollMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_CATEGORIES_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Getting detail categories',
      };
    }
    case 'GET_CATEGORIES_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: 'Get detail category rejected',
      };
    }
    case 'GET_CATEGORIES_FULFILLED': {
      return {
        ...state,
        data: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
        pending: false,
        error: false,
        success: true,
        message: 'Get category success',
      };
    }
    case 'SCROLL_CATEGORIES_PENDING': {
      return {
        ...state,
        scrollPending: true,
        scrollError: false,
        scrollSuccess: false,
        scrollMessage: 'Scrolling detail categories',
      };
    }
    case 'SCROLL_CATEGORIES_REJECTED': {
      return {
        ...state,
        scrollPending: false,
        scrollError: true,
        scrollSuccess: false,
        scrollMessage: action.payload.response.data.message,
      };
    }
    case 'SCROLL_CATEGORIES_FULFILLED': {
      return {
        ...state,
        data: [...state.data, ...action.payload.data.results],
        pageInfo: action.payload.data.pageInfo,
        scrollPending: false,
        scrollError: false,
        scrollSuccess: true,
        scrollMessage: 'Scroll category success',
      };
    }
  }
};
