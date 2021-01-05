const initialState = {
  isLogin: false,
  token: '',
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_LOGIN_PENDING': {
      console.log('login pending');
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLogin: false,
        alertMsg: 'Logging in ...',
      };
    }
    case 'AUTH_USER_LOGIN_FULFILLED': {
      console.log('login fullfiled');
      return {
        ...state,
        isLogin: true,
        isError: false,
        isLoading: false,
        token: action.payload.data.token,
        alertMsg: 'Login successfull',
      };
    }
    case 'AUTH_USER_LOGIN_REJECTED': {
      return {
        ...state,
        isLogin: false,
        isError: true,
        isLoading: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'AUTH_USER_LOGOUT': {
      return {
        ...state,
        isLogin: false,
        isError: false,
        isLoading: false,
        token: '',
        alertMsg: 'Logout successfull',
      };
    }
    case 'CLEAR_ALERT_LOGIN': {
      return {
        ...state,
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
