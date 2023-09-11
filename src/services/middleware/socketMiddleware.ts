import Api from "../api";
import { Middleware, MiddlewareAPI } from "redux";
import { dataUrl } from "../../utils/data";
import { RootState } from "../types";
import { TSocketAction, IWsActions } from "../actions/socket";

export const socketMiddleware =
  (wsActions: IWsActions): Middleware => 
  (store: MiddlewareAPI) => {
    let socket: WebSocket | null;
    let activeStorage: string;

    return (next) => (action: TSocketAction) => {
      const { dispatch } = store;
      // const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (action.type === wsInit) {
        socket = new WebSocket(action.wsUrl);
        activeStorage = action.storage;
      }
      
      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: onOpen
          });
        };

        socket.onerror = (event) => {
          dispatch({
            type: onError,
            message: "uknnown error: websocket error"});
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            const api = new Api({ baseUrl: dataUrl });
            await api.getUserRequest();
          }

          // const { success, ...restParsedData } = parsedData;

          dispatch({
            type: onMessage,
            payload: { ...parsedData, storage: activeStorage }
          });
        };

        socket.onclose = (event) => {
          dispatch({
            type: onClose
          });
        };

        if (action.type === wsClose) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
