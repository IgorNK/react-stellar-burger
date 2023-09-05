import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { authReducer } from "./auth";
import { wsReducer } from "./socket";
import { TApplicationAction } from "../actions";
import { DISPLAY_ERROR_MESSAGE } from "../actions/index";

const errorReducer = (state = null, action: TApplicationAction) => {
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
  auth: authReducer,
  cart: cartReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  error: errorReducer,
  feed: wsReducer,
});
