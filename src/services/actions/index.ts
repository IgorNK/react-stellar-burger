import { TAuthActions } from "./actions/auth";
import { TCartActions } from "./actions/cart";
import { TIngredientsActions } from "./actions/ingredients";
import { TOrderActions } from "./actions/order";
import { TSocketActions } from "./actions/socket";

export const DISPLAY_ERROR_MESSAGE: "DISPLAY_ERROR_MESSAGE" = "DISPLAY_ERROR_MESSAGE";

export interface IDisplayErrorMessageAction {
  readonly type: typeof DISPLAY_ERROR_MESSAGE;
  readonly message: string;
}

export const displayErrorMessageAction = (message: string): IDisplayErrorMessageAction => ({
  type: DISPLAY_ERROR_MESSAGE,
  message
});

export type TApplicationActions = TAuthActions | 
  TCartActions | 
  TIngredientActions | 
  TOrderActions | 
  TWsActions |
  IDisplayErrorMessageAction;
