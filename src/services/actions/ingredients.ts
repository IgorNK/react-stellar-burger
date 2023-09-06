import Api from "../api";
import { dataUrl } from "../../utils/data";
import { AppThunk, AppDispatch } from "../types";
import { TIngredient } from "../types/data";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export const SHOW_INGREDIENT = "SHOW_INGREDIENT";
export const SWITCH_TAB = "SWITCH_TAB";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IShowIngredientAction {
  readonly type: typeof SHOW_INGREDIENT;
  readonly item: TIngredient;
}

export interface ISwitchTabAction {
  readonly type: typeof SWITCH_TAB;
  tab: string; // change this to enum later
}

export type TIngredientsAction = IGetIngredientsRequestAction |
  IGetIngredientsSuccessAction |
  IGetIngredientsFailedAction |
  IShowIngredientAction |
  ISwitchTabAction;

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccessAction = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export const showIngredientAction = (item: TIngredient): IShowIngredientAction => ({
  type: SHOW_INGREDIENT,
  item
});

export const switchTabAction = (tab: string): ISwitchTabAction => ({
  type: SWITCH_TAB,
  tab
});

export function getIngredients() {
  const api = new Api({ baseUrl: dataUrl });

  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequestAction());
    api.getIngredientsRequest().then((res) => {
      if (res && res.success) {
        dispatch(getIngredientsSuccessAction(res.data));
      } else {
        dispatch(getIngredientsFailedAction());
      }
    });
  };
}
