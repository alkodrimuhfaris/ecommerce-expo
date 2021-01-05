const initialState = {
  pending: false,
  error: false,
  success: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        message: 'Updating your file...',
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        message: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        message: 'Success updating profile',
      };
    }
    case 'CLEAR_STATE_UPDATE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
