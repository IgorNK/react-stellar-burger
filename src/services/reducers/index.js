import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { DISPLAY_ERROR_MESSAGE } from "../actions/index";

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case DISPLAY_ERROR_MESSAGE: {
      return action.message;
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  cart: cartReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  error: errorReducer,
});
