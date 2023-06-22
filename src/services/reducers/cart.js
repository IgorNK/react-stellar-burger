import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";

const initialState = {
  total: 0,
  items: [],
};

function getTotal(ingredients) {
  return ingredients.reduce((sum, item) => sum + item.price, 0);
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newItems = [...state.items, action.ingredient];
      const newTotal = getTotal(newItems);
      return {
        ...state,
        total: newTotal,
        items: state.items.concat(action.ingredient),
      };
    }
    case REMOVE_FROM_CART: {
      const newItems = [...state.items];
      const itemIndex = newItems.indexOf(action.ingredient);
      if (itemIndex > -1) {
        newItems.splice(itemIndex, 1);
      }
      const newTotal = getTotal(newItems);
      return {
        ...state,
        total: newTotal,
        items: newItems,
      };
    }
    default: {
      return state;
    }
  }
};
