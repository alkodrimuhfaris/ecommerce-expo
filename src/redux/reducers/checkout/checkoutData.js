const initialState = {
  couriers: [],
  services: [],
  itemdetails_id: [],
  quantity: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHECKOUT': {
      const {payload} = action;
      return {
        ...state,
        couriers: payload.couriers,
        services: payload.services,
        itemdetails_id: payload.itemdetails_id,
        quantity: payload.quantity,
      };
    }
    case 'REMOVE_CHECKOUT_DATA': {
      console.log(initialState);
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
