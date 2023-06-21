import { submitOrderRequest } from "../api";

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";

export function submitOrder(ingredientIDs) {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    submitOrderRequest(ingredientIDs).then((res) => {
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
    });
  };
}
