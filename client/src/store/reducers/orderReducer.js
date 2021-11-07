import * as Types from "../constants/OrderType";

const init = {
  order: [],
  error: {},
};

const orderReducer = (state = init, action) => {
  switch (action.type) {
    case Types.ORDER_PRODUCT: {
      const temp = [...state.order, action.payload];
      return {
        ...state,
        order: temp,
      };
    }
    case Types.ORDER_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case Types.GET_ORDER_PRODUCT: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case Types.GET_ORDER_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
