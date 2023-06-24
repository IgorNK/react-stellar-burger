import uuid from "react-uuid";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_POSITION,
  SET_DRAGGING,
} from "../actions/cart";

const initialState = {
  total: 0,
  cartItems: [],
  isDragging: false,
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
      // console.log(`key: ${action.key}, cartItem: ${cartItem}`);
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
    case SET_CART_POSITION: {
      const newItems = [...state.cartItems];
      console.log(`dragged: ${action.draggedID}, index: ${action.index}`);
      const draggedItem = newItems.find(
        (cartItem) => cartItem.key === action.draggedID
      ).item;
      newItems.splice(action.index, 0, { key: uuid(), item: draggedItem });
      return {
        ...state,
        cartItems: newItems.filter(
          (cartItem) => cartItem.key !== action.draggedID
        ),
      };
    }
    case SET_DRAGGING: {
      return {
        ...state,
        isDragging: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
