const initialState = {
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
    case 'SEARCH_ITEM_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'searching item..',
      };
    }
    case 'SEARCH_ITEM_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: 'search item rejected',
      };
    }
    case 'SEARCH_ITEM_FULFILLED': {
      return {
        ...state,
        items: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
        pending: false,
        error: false,
        success: true,
        message: 'search item successfull',
      };
    }
    case 'SCROLL_SEARCH_ITEM_PENDING': {
      return {
        ...state,
        scrolPending: true,
        scrollError: false,
        scrollSuccess: false,
        scrollMessage: 'Scrolling item..',
      };
    }
    case 'SCROLL_SEARCH_ITEM_REJECTED': {
      return {
        ...state,
        scrollPending: false,
        scrollError: true,
        scrollSuccess: false,
        scrollMessage: 'Scroll item rejected',
      };
    }
    case 'SCROLL_SEARCH_ITEM_FULFILLED': {
      return {
        ...state,
        items: [...state.items, ...action.payload.data.results],
        pageInfo: action.payload.data.pageInfo,
        scrollPending: false,
        scrollError: false,
        scrollSuccess: true,
        scrollMessage: 'Scroll item successfull',
      };
    }
  }
};
