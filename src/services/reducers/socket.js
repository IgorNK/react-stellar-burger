import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/socket";

const initialState = {
  wsConnected: false,
  feedOrders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...initialState,
      };

    case WS_GET_MESSAGE:
      let newState = {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
      switch (action.payload.storage) {
        case "feed": {
          newState.feedOrders = action.payload.orders;
          break;
        }
        case "user": {
          newState.userOrders = action.payload.orders;
          break;
        }
        default: {
          break;
        }
      }
      return newState;

    default:
      return state;
  }
};
