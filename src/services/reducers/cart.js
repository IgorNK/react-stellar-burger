import uuid from "react-uuid";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";

const initialState = {
  total: 0,
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newItems = [
        ...state.cartItems,
        {
          key: uuid(),
          item: action.item,
        },
      ];
      const newTotal = state.total + action.item.price;
      return {
        ...state,
        total: newTotal,
        cartItems: newItems,
      };
    }
    case REMOVE_FROM_CART: {
      const cartItem = state.cartItems.find(
        (cartItem) => cartItem.key === action.key
      );
      const newItems = [...state.cartItems].filter(
        (item) => item.key !== action.key
      );
      const newTotal = state.total - cartItem.item.price;
      return {
        ...state,
        total: newTotal,
        cartItems: newItems,
      };
    }
    default: {
      return state;
    }
  }
};
