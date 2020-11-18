const initialState = {
  isSend: false,
  isLoading: false,
  isError: false,
  alertMsg: '',
  isReset: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_RESET_CODE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Trying to send reset code',
      };
    }
    case 'SEND_RESET_CODE_FULFILLED': {
      return {
        ...state,
        isSend: true,
        isError: false,
        alertMsg: 'Reset code sent',
      };
    }
    case 'SEND_RESET_CODE_REJECTED': {
      return {
        ...state,
        isSend: false,
        isError: true,
        alertMsg: 'Reset code sent failed!',
      };
    }
    case 'MATCH_RESET_CODE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Trying to match the reset code',
      };
    }
    case 'MATCH_RESET_CODE_FULFILLED': {
      return {
        ...state,
        isReset: true,
        isError: false,
        alertMsg: 'Password reset succesfully',
      };
    }
    case 'MATCH_RESET_CODE_REJECTED': {
      return {
        ...state,
        isReset: false,
        isError: true,
        alertMsg: action.payload.data.message,
      };
    }
    default: {
      return state;
    }
  }
};
