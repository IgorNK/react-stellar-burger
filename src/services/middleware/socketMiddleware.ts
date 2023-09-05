import Api from "../api";
import { dataUrl } from "../../utils/data";
import { wsInit, wsClose, onOpen, onClose, onError, onMessage } from "../actions/socket";
import {
  WS_CONNECTION_START, 
  WS_CONNECTION_CLOSE, 
  WS_CONNECTION_OPEN, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from "../actions/socket";
import { TSocketAction } from "../actions/socket";

export const socketMiddleware = () => {
  return (store) => {
    let socket: WebSocket & { activeStorage: string } = new WebSocket();

    return (next) => (action: TSocketAction) => {
      const { dispatch } = store;
      // const { type, payload } = action;
      // const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
      //   wsActions;

      if (action.type === WS_CONNECTION_START) {
        socket = new WebSocket(action.wsUrl);
        socket.activeStorage = action.storage;
      }
      
      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.message));
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            const api = new Api({ baseUrl: dataUrl });
            await api.getUserRequest();
          }

          // const { success, ...restParsedData } = parsedData;

          dispatch(onMessage({ ...parsedData, storage: socket.activeStorage }));
        };

        socket.onclose = (event) => {
          dispatch(onClose());
        };

        if (action.type === WS_CONNECTION_CLOSED) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
