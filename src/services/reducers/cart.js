import uuid from "react-uuid";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  MOVE_CART_ITEM,
  CLEAR_CART,
} from "../actions/cart";

const initialState = {
  total: 0,
  bun: null,
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  const moveCartItem = (dragIndex, hoverIndex) => {
    const newItems = [...state.cartItems];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, state.cartItems[dragIndex]);
    return newItems;
  };

  switch (action.type) {
    case ADD_TO_CART: {
      if (action.item.type !== "bun") {
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
      } else {
        const newBun = {
          key: uuid(),
          item: action.item,
        };
        const newTotal = state.total + action.item.price * 2;
        return {
          ...state,
          total: newTotal,
          bun: newBun,
        };
      }
    }
    case REMOVE_FROM_CART: {
      const allItems = [...state.cartItems, state.bun];
      const cartItem = allItems.find((item) => item.key === action.key);
      if (cartItem.item.type !== "bun") {
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
      } else {
        const newTotal = state.total - state.bun.item.price * 2;
        return {
          ...state,
          total: newTotal,
          bun: null,
        };
      }
    }
    case MOVE_CART_ITEM: {
      return {
        ...state,
        cartItems: moveCartItem(action.dragIndex, action.hoverIndex),
      };
    }
    case CLEAR_CART: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
