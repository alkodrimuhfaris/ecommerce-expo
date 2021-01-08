const initialState = {
  deliveryFee: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'SET_DELIVERY_SERVICE': {
      return {
        ...state,
        deliveryFee: action.payload,
      };
    }
    case 'AUTH_USER_LOGOUT': {
      return {
        ...state,
        ...initialState,
      };
    }
    case 'REMOVE_CHECKOUT_DATA': {
      console.log(initialState);
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
