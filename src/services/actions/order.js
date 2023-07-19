import Api from "../api";
import { dataUrl } from "../../utils/data";

import { DISPLAY_ERROR_MESSAGE } from "./index";

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";
export const ORDER_REPORTED = "ORDER_REPORTED";

export function submitOrder(ingredientIDs) {
  const api = new Api({ baseUrl: dataUrl });

  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    api
      .submitOrderRequest(ingredientIDs)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            number: res.order.number,
            ingredientIDs: ingredientIDs,
          });
        } else {
          dispatch({
            type: SEND_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: DISPLAY_ERROR_MESSAGE,
          message: err.message,
        });
      });
  };
}
