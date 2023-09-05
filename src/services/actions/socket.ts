import { TWsMessage } from "../types/data";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_OPEN: "WS_CONNECTION_OPEN" = "WS_CONNECTION_OPEN";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly wsUrl: string,
  readonly storage: string,
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsConnectionOpenAction {
  readonly type: typeof WS_CONNECTION_OPEN;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly message: string;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWsMessage;
}

export type TSocketAction = IWsConnectionStartAction |
  IWsConnectionCloseAction |
  IWsConnectionOpenAction |
  IWsConnectionErrorAction |
  IWsConnectionClosedAction |
  IWsGetMessageAction;

export const wsInit = (wsUrl: string, storage: string): IWsConnectionStartAction => ({
  type: WS_CONNECTION_START,
  wsUrl,
  storage
});

export const wsClose = (): IWsConnectionCloseAction => ({
  type: WS_CONNECTION_CLOSE
});

export const onOpen = (): IWsConnectionOpenAction => ({
  type: WS_CONNECTION_OPEN,
});

export const onClose = (): IWsConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED,
});

export const onError = (message: string): IWsConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  message
});

export const onMessage = (payload: TWsMessage): IWsGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload
});

// export interface IWsActions {
//   readonly wsInit: typeof WS_CONNECTION_START;
//   readonly wsClose: typeof WS_CONNECTION_CLOSE;
//   readonly onOpen: typeof WS_CONNECTION_OPEN;
//   readonly onClose: typeof WS_CONNECTION_CLOSED;
//   readonly onError: typeof WS_CONNECTION_ERROR;
// }

// export const wsActions: IWsActions = {
//   wsInit: WS_CONNECTION_START,
//   wsClose: WS_CONNECTION_CLOSE,
//   onOpen: WS_CONNECTION_SUCCESS,
//   onClose: WS_CONNECTION_CLOSED,
//   onError: WS_CONNECTION_ERROR,
//   onMessage: WS_GET_MESSAGE,
// };