import { TIngredientsAction } from "../actions/ingredients";
import { TIngredient } from "../types/data";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SHOW_INGREDIENT,
  SWITCH_TAB,
} from "../actions/ingredients";

export type TIngredientsState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  shownIngredient: null | TIngredient;
  currentTab: string // consider enum later
}

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  shownIngredient: null,
  currentTab: "buns",
};

export const ingredientsReducer = (state = initialState, action: TIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsFailed: true,
      };
    }
    case SHOW_INGREDIENT: {
      return {
        ...state,
        shownIngredient: action.item,
      };
    }
    case SWITCH_TAB: {
      return {
        ...state,
        currentTab: action.tab,
      };
    }
    default: {
      return state;
    }
  }
};
