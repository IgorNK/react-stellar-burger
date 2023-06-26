import uuid from "react-uuid";
import { ADD_TO_CART, REMOVE_FROM_CART, MOVE_CART_ITEM } from "../actions/cart";

const initialState = {
  total: 0,
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  const getAdjustedPrice = (isBun = false, price) => {
    return isBun ? price * 2 : price;
  };

  const moveCartItem = (dragIndex, hoverIndex) => {
    const newItems = [...state.cartItems];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, state.cartItems[dragIndex]);
    return newItems;
  };

  switch (action.type) {
    case ADD_TO_CART: {
      const newItems = [
        ...state.cartItems,
        {
          key: uuid(),
          item: action.item,
        },
      ];
      const newTotal =
        state.total +
        getAdjustedPrice(action.item.type === "bun", action.item.price);
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

      const newTotal =
        state.total -
        getAdjustedPrice(cartItem.item.type === "bun", cartItem.item.price);
      return {
        ...state,
        total: newTotal,
        cartItems: newItems,
      };
    }
    case MOVE_CART_ITEM: {
      return {
        ...state,
        cartItems: moveCartItem(action.dragIndex, action.hoverIndex),
      };
    }
    default: {
      return state;
    }
  }
};
