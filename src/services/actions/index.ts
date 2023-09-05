import { TAuthAction } from "./auth";
import { TCartAction } from "./cart";
import { TIngredientsAction } from "./ingredients";
import { TOrderAction } from "./order";
import { TSocketAction } from "./socket";

export const DISPLAY_ERROR_MESSAGE: "DISPLAY_ERROR_MESSAGE" = "DISPLAY_ERROR_MESSAGE";

export interface IDisplayErrorMessageAction {
  readonly type: typeof DISPLAY_ERROR_MESSAGE;
  readonly message: string;
}

export const displayErrorMessageAction = (message: string): IDisplayErrorMessageAction => ({
  type: DISPLAY_ERROR_MESSAGE,
  message
});

export type TApplicationAction = TAuthAction | 
  TCartAction | 
  TIngredientsAction | 
  TOrderAction | 
  TSocketAction |
  IDisplayErrorMessageAction;
