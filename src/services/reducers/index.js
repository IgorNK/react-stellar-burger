import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  cart: cartReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});
