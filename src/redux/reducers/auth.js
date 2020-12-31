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
        alertMsg: 'Logging in ...',
      };
    }
    case 'AUTH_USER_LOGIN_FULFILLED': {
      console.log('login fullfiled');
      return {
        ...state,
        isLogin: true,
        isError: false,
        token: action.payload.data.token,
        alertMsg: 'Login successfull',
      };
    }
    case 'AUTH_USER_LOGIN_REJECTED': {
      return {
        ...state,
        isLogin: false,
        isError: true,
        alertMsg: 'Login failed',
      };
    }
    case 'AUTH_USER_LOGOUT': {
      return {
        ...state,
        isLogin: false,
        isError: false,
        token: '',
        alertMsg: 'Logout successfull',
      };
    }
    default: {
      return state;
    }
  }
};
