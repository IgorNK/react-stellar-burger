import Api from "../api";
import { dataUrl } from "../../utils/data";

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload.wsUrl);
        socket.activeStorage = payload.storage;
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            const api = new Api({ baseUrl: dataUrl });
            await api.getUserRequest();
          }

          const { success, ...restParsedData } = parsedData;

          dispatch({
            type: onMessage,
            payload: { ...restParsedData, storage: socket.activeStorage },
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsClose) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
