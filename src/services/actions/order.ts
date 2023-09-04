import Api from "../api";
import { dataUrl } from "../../utils/data";
import { TOrder } from "../types/data";

import { DISPLAY_ERROR_MESSAGE } from "./index";
import { displayErrorMessageAction } from "./index";

export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED: "SEND_ORDER_FAILED" = "SEND_ORDER_FAILED";
export const ORDER_REPORTED: "ORDER_REPORTED" = "ORDER_REPORTED";

export interface ISendOrderRequestAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly number: number;
  readonly ingredientIDs: ReadonlyArray<string>;
}

export interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}

export interface IOrderReportedAction {
  readonly type: typeof ORDER_REPORTED;
}

export type TOrderActions = ISendOrderRequestAction |
  ISendOrderSuccessAction |
  ISendOrderFailedAction |
  IOrderReportedAction;

export const sendOrderRequestAction = (): ISendOrderRequestAction => ({
  type: SEND_ORDER_REQUEST
});

export const sendOrderSuccessAction = (number: number, ingredientIDs: ReadonlyArray<string>): ISendOrderSuccessAction => ({
  type: SEND_ORDER_SUCCESS,
  number,
  ingredientIDs
});

export const sendOrderFailedAction = (): ISendOrderFailedAction => ({
  type: SEND_ORDER_FAILED
});

export const orderReportedAction = (): IOrderReportedAction => ({
  type: ORDER_REPORTED
});

export function submitOrder(ingredientIDs) {
  const api = new Api({ baseUrl: dataUrl });

  return function (dispatch) {
    dispatch(sendOrderRequestAction());
    api
      .submitOrderRequest(ingredientIDs)
      .then((res) => {
        if (res && res.success) {
          dispatch(sendOrderSuccessAction(res.order.number, ingredientIDs));
        } else {
          dispatch(sendOrderFailedAction());
        }
      })
      .catch((err) => {
        dispatch(displayErrorMessageAction(err.message));
      });
  };
}