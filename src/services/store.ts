import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware";
import { IWsActions } from "./actions/socket";
import { WS_CONNECTION_START,
        WS_CONNECTION_CLOSE,
        WS_CONNECTION_OPEN,
        WS_CONNECTION_CLOSED,
        WS_CONNECTION_ERROR,
        WS_GET_MESSAGE } from "./actions/socket";

const composeEnhancers =
  typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsActions: IWsActions = {
  wsInit: WS_CONNECTION_START, 
  wsClose: WS_CONNECTION_CLOSE, 
  onOpen: WS_CONNECTION_OPEN, 
  onClose: WS_CONNECTION_CLOSED, 
  onError: WS_CONNECTION_ERROR, 
  onMessage: WS_GET_MESSAGE,  
}

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const store = createStore(rootReducer, enhancer);