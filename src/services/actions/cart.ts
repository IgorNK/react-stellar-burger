import { TIngredient, TCartItem } from "../types/data";

export const ADD_TO_CART: "ADD_TO_CART" = "ADD_TO_CART";
export const REMOVE_FROM_CART: "REMOVE_FROM_CART" = "REMOVE_FROM_CART";
export const MOVE_CART_ITEM: "MOVE_CART_ITEM" = "MOVE_CART_ITEM";
export const CLEAR_CART: "CLEAR_CART" = "CLEAR_CART";

export interface IAddToCartAction {
  readonly type: typeof ADD_TO_CART;
  readonly item: TIngredient;
}

export interface IRemoveFromCartAction {
  readonly type: typeof REMOVE_FROM_CART;
  readonly key: string;
}

export interface IMoveCartItemAction {
  readonly type: typeof MOVE_CART_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IClearCartAction {
  readonly type: typeof CLEAR_CART;
}

export type TCartAction = IAddToCartAction |
  IRemoveFromCartAction |
  IMoveCartItemAction |
  IClearCartAction;

export const addToCartAction = (item: TIngredient): IAddToCartAction => ({
  type: ADD_TO_CART,
  item
});

export const removeFromCartAction = (key: string): IRemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  key
});

export const moveCartItemAction = (dragIndex: number, hoverIndex: number): IMoveCartItemAction => ({
  type: MOVE_CART_ITEM,
  dragIndex,
  hoverIndex
});

export const clearCartAction = (): IClearCartAction => ({
  type: CLEAR_CART
});