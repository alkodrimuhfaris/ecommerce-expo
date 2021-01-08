const initialState = {
  category: {},
  items: [],
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
    case 'GET_CATEGORY_DETAIL_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Getting category detail...',
      };
    }
    case 'GET_CATEGORY_DETAIL_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: 'Get category detail is error',
      };
    }
    case 'GET_CATEGORY_DETAIL_FULFILLED': {
      return {
        ...state,
        category: action.payload.data.category,
        items: action.payload.data.items,
        pageInfo: action.payload.data.pageInfo,
        pending: false,
        error: false,
        success: true,
        message: 'Get category detail is success',
      };
    }
    case 'SCROLL_CATEGORY_DETAIL_PENDING': {
      return {
        ...state,
        scrollPending: true,
        scrollError: false,
        scrollSuccess: false,
        scrollMessage: 'Scrolling category detail...',
      };
    }
    case 'SCROLL_CATEGORY_DETAIL_REJECTED': {
      return {
        ...state,
        scrollPending: false,
        scrollError: true,
        scrollSuccess: false,
        scrollMessage: action.payload.response.data.message,
      };
    }
    case 'SCROLL_CATEGORY_DETAIL_FULFILLED': {
      return {
        ...state,
        category: action.payload.data.category,
        items: [...state.items, ...action.payload.data.items],
        categoryPageInfo: action.payload.data.pageInfo,
        scrollPending: false,
        scrollError: true,
        scrollSuccess: true,
        scrollMessage: 'Scroll category detail is success',
      };
    }
  }
};
