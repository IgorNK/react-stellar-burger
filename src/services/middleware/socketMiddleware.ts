import Api from "../api";
import { dataUrl } from "../../utils/data";
import { wsInit, wsClose, onOpen, onClose, onError, onMessage } from "../actions/socket";
import { IWsConnectionStartAction, 
  IWsConnectionCloseAction,
  IWsConnectionOpenAction,
  IWsConnectionErrorAction,
  IWsConnectionClosedAction,
  IWsGetMessageAction } from "../actions/socket";

export const socketMiddleware = () => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      // const { type, payload } = action;
      // const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
      //   wsActions;

      if (typeof action == IWsConnectionStartAction) {
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

        if (typeof action == IWsConnectionClosedAction) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
