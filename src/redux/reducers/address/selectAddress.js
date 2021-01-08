const initialState = {
  address_id: 0,
  addressDetail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'SELECT_ADDRESS': {
      return {
        ...state,
        address_id: action.payload.id,
        addressDetail: action.payload,
      };
    }
    case 'AUTH_USER_LOGOUT': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
