import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../actions/cart";

const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        items: state.items.concat(action.ingredient),
      };
    }
    case REMOVE_INGREDIENT: {
    }
    default: {
      return state;
    }
  }
};
